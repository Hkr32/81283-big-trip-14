import {
  AUTHORIZATION,
  END_POINT,
  MenuItem,
  UpdateType,
  FilterType
} from './utils/const.js';

import Api from './api/api.js';

import HeaderMenuView from './view/header/menu.js';

import HeaderPresenter from './presenter/header.js';
import TripPresenter from './presenter/trip.js';
import StatisticsPresenter from './presenter/statistics.js';

import PointModel from './model/points.js';
import HeaderModel from './model/header.js';

const headerMenuComponent = new HeaderMenuView();

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointModel();
const headerModel = new HeaderModel();

const tripPresenter = new TripPresenter(document.querySelector('.page-body .trip-events'), headerModel, pointsModel, api);
const statisticsPresenter = new StatisticsPresenter(document.querySelector('.page-body section.statistics'), pointsModel);

const handlePointNewFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  headerMenuComponent.setMenuItem(MenuItem.TABLE);
};

// Header
const headerPresenter = new HeaderPresenter(document.querySelector('.page-header .trip-main'), headerMenuComponent, headerModel, pointsModel);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripPresenter.destroy();
      headerModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
      headerModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      headerPresenter.setDisabled(false);
      statisticsPresenter.destroy();
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      break;
    case MenuItem.STATISTICS:
      headerPresenter.setDisabled(true);
      tripPresenter.destroy();
      statisticsPresenter.init();
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      break;
  }
};

tripPresenter.init();

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    pointsModel.setOffers(offers);
    pointsModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setOffers([]);
    pointsModel.setDestinations([]);
    pointsModel.setPoints(UpdateType.INIT, []);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
