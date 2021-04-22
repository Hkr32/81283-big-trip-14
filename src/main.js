// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';

import { POINT_COUNTER } from './utils/const.js';
import { render } from './utils/render.js';

import HeaderMenuView from './view/menu.js';
import HeaderFilterView from './view/filter.js';

import TripPresenter from './presenter/trip.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

// Хедер страницы
const headerElement = document.querySelector('.page-header');

// Добавляем меню
const headerMenuElement = headerElement.querySelector('.trip-controls__navigation');
render(headerMenuElement, new HeaderMenuView());

// Добавляем фильтры
const headerFilterElement = headerElement.querySelector('.trip-controls__filters');
render(headerFilterElement, new HeaderFilterView());

// Вызов отрисовки точек
const tripPresenter = new TripPresenter(document.querySelector('.page-body'));
tripPresenter.init(points);
