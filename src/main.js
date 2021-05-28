import { MenuItem, UpdateType, FilterType } from './utils/const.js';
import { STORE_NAME } from './utils/store.js';
import { AUTHORIZATION, END_POINT } from './utils/api.js';
import { isOnline } from './utils/common.js';
import { toast } from './utils/toast.js';

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

import HeaderMenuView from './view/header/menu.js';

import HeaderPresenter from './presenter/header.js';
import TripPresenter from './presenter/trip.js';
import StatisticsPresenter from './presenter/statistics.js';

import PointModel from './model/points.js';
import HeaderModel from './model/header.js';

const headerMenuComponent = new HeaderMenuView();

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointModel();
const headerModel = new HeaderModel();

const tripPresenter = new TripPresenter(document.querySelector('.page-body .trip-events'), headerModel, pointsModel, apiWithProvider);
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
      if (!isOnline()) {
        toast('You can\'t create new point offline');
        headerMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      }
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
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getPoints(),
])
  .then(([offers, destinations, points]) => {
    pointsModel.setOffers(offers);
    pointsModel.setDestinations(destinations);
    pointsModel.set(UpdateType.INIT, points);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setOffers([]);
    pointsModel.setDestinations([]);
    pointsModel.set(UpdateType.INIT, []);
    headerPresenter.init();
    headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
