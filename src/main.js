// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';

import { POINT_COUNTER } from './utils/const.js';

import HeaderPresenter from './presenter/header.js';
import TripPresenter from './presenter/trip.js';
import PointModel from './model/points.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

const pointsModel = new PointModel();
pointsModel.setPoints(points);

// Header
const headerPresenter = new HeaderPresenter(document.querySelector('.page-header'));
headerPresenter.init(points);

// Trip
const tripPresenter = new TripPresenter(document.querySelector('.page-body'), pointsModel);
tripPresenter.init();
