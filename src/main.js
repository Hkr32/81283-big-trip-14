// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';

import { POINT_COUNTER } from './utils/const.js';
import { render } from './utils/render.js';

import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderFilterView from './view/filter.js';

import TripPresenter from './presenter/trip.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');

// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteHeaderMenuElement, new SiteHeaderMenuView());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, new SiteHeaderFilterView());

// Вызов отрисовки точек
const tripPresenter = new TripPresenter(document.querySelector('.page-body'));
tripPresenter.init(points);
