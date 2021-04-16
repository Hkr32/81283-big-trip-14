// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';
import { offers, destinations } from './mock/const.js';

import { POINT_COUNTER, position } from './const.js';
import { render } from './utils.js';

import SiteHeaderInfoView from './view/info.js';
import SiteHeaderNavigationView from './view/navigation.js';
import SiteHeaderCostView from './view/cost.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderFilterView from './view/filter.js';
import SiteMainSortingView from './view/sorting.js';
import SitePointListView from './view/point-list.js';
import SitePointView from './view/point.js';
import SitePointEditView from './view/point-edit.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');

// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
render(siteHeaderTripMainElement, new SiteHeaderInfoView().getElement(), position.AFTER_BEGIN);
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderInfoElement, new SiteHeaderNavigationView(points).getElement(), position.AFTER_BEGIN);
render(siteHeaderInfoElement, new SiteHeaderCostView(points).getElement());

// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteHeaderMenuElement, new SiteHeaderMenuView().getElement());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, new SiteHeaderFilterView().getElement());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

// Добавляем сортировку
render(siteMainEventsElement, new SiteMainSortingView().getElement());

// Добавляем шаблон для точек
render(siteMainEventsElement, new SitePointListView().getElement());
//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < POINT_COUNTER; i++) {
  render(siteMainPointListElement, new SitePointView(points[i]).getElement());
}

// Добавляем форму редактирования в начало списка
// render(siteMainPointListElement, new SitePointEditView(destinations, offers).getElement(), position.AFTER_BEGIN);
