// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';

import { POINT_COUNTER } from './utils/const.js';

import HeaderPresenter from './presenter/header.js';
import TripPresenter from './presenter/trip.js';

import PointModel from './model/points.js';
import HeaderModel from './model/header.js';
import FilterModel from './model/filter.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

const pointsModel = new PointModel();
pointsModel.setPoints(points);
const headerModel = new HeaderModel();
const filterModel = new FilterModel();

// Header
const headerPresenter = new HeaderPresenter(document.querySelector('.page-header'), headerModel, filterModel, pointsModel);
headerPresenter.init();

// Trip
const tripPresenter = new TripPresenter(document.querySelector('.page-body'), headerModel, filterModel, pointsModel);
tripPresenter.init();
