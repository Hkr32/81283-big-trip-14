// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';

import { POINT_COUNTER, MenuItem, UpdateType, FilterType } from './utils/const.js';

import HeaderMenuView from './view/header/menu.js';

import HeaderPresenter from './presenter/header.js';
import TripPresenter from './presenter/trip.js';
import StatisticsPresenter from './presenter/statistics.js';

import PointModel from './model/points.js';
import HeaderModel from './model/header.js';

const headerMenuComponent = new HeaderMenuView();

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

const pointsModel = new PointModel();
pointsModel.setPoints(points);
const headerModel = new HeaderModel();

// Trip
const tripPresenter = new TripPresenter(document.querySelector('.page-body'), headerModel, pointsModel);
tripPresenter.init();

// Statistics
const statisticsPresenter = new StatisticsPresenter(document.querySelector('.page-body section.statistics'), pointsModel);
// statisticsPresenter.init();

const handlePointNewFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  headerMenuComponent.setMenuItem(MenuItem.TABLE);
};

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
      statisticsPresenter.destroy();
      break;
    case MenuItem.STATISTICS:
      document.querySelector('.trip-main__event-add-btn').disabled = true;

      // @todo Нет эффекта, все равно можно нажать на фильтры
      const filters = document.querySelectorAll('.trip-filters input.trip-filters__filter-input');
      const labels = document.querySelectorAll('.trip-filters label.trip-filters__filter-label');
      filters.forEach((filter) => {
        filter.disabled = true;
      });
      labels.forEach((label) => {
        label.disabled = true;
      });

      tripPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

// Header
const headerPresenter = new HeaderPresenter(document.querySelector('.page-header .trip-main'), headerMenuComponent, headerModel, pointsModel);
headerPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});

headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);
