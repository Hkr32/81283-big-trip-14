// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';
import { offers, destinations } from './mock/const.js';

import { POINT_COUNTER, position } from './const.js';
import { renderTemplate, renderElement } from './utils.js';

import SiteHeaderInfoView from './view/info.js';
import SiteHeaderNavigationView from './view/navigation.js';
import SiteHeaderCostView from './view/cost.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderFilterView from './view/filter.js';
import SiteMainSortingView from './view/sorting.js';
import { createSitePointListTemplate } from './view/point-list.js';
import { createSitePointTemplate } from './view/point.js';
import { createSitePointEditTemplate } from './view/point-edit.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');

// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
renderElement(siteHeaderTripMainElement, new SiteHeaderInfoView().getElement(), position.AFTER_BEGIN);
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
renderElement(siteHeaderInfoElement, new SiteHeaderNavigationView(points).getElement(), position.AFTER_BEGIN);
renderElement(siteHeaderInfoElement, new SiteHeaderCostView(points).getElement());

// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
renderElement(siteHeaderMenuElement, new SiteHeaderMenuView().getElement());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
renderElement(siteHeaderFilterElement, new SiteHeaderFilterView().getElement());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

// Добавляем сортировку
renderElement(siteMainEventsElement, new SiteMainSortingView().getElement());

// Добавляем шаблон для точек
renderTemplate(siteMainEventsElement, createSitePointListTemplate());

//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < POINT_COUNTER; i++) {
  renderTemplate(siteMainPointListElement, createSitePointTemplate(points[i]));
}

// Добавляем форму редактирования в начало списка
renderTemplate(siteMainPointListElement, createSitePointEditTemplate(destinations, offers), position.AFTER_BEGIN);
