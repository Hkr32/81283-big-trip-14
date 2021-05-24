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
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      tripPresenter.destroy();
      headerModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      headerPresenter.setDisabled(false);
      statisticsPresenter.destroy();
      break;
    case MenuItem.STATISTICS:
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      headerPresenter.setDisabled(true);
      tripPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

tripPresenter.init();

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
