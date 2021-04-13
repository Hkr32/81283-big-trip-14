// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';
import { offers, destinations } from './mock/const.js';

import { POINT_COUNTER, position } from './const.js';
import { renderTemplate, renderElement } from './utils.js';

import SiteHeaderMenuView from './view/menu.js';
import { createSiteHeaderInfoTemplate } from './view/info.js';
import { createSiteHeaderNavigationTemplate } from './view/navigation.js';
import { createSiteHeaderCostTemplate } from './view/cost.js';
import { createSiteHeaderFilterTemplate } from './view/filter.js';
import { createSiteMainSortingTemplate } from './view/sorting.js';
import { createSitePointListTemplate } from './view/point-list.js';
import { createSitePointTemplate } from './view/point.js';
import { createSitePointEditTemplate } from './view/point-edit.js';

// Генерируем случайный набор точек
const points = new Array(POINT_COUNTER).fill().map(generatePoint);

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');

// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
renderTemplate(siteHeaderTripMainElement, createSiteHeaderInfoTemplate(), position.AFTER_BEGIN);
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
renderTemplate(siteHeaderInfoElement, createSiteHeaderNavigationTemplate(points), position.AFTER_BEGIN);
renderTemplate(siteHeaderInfoElement, createSiteHeaderCostTemplate(points));

// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
renderElement(siteHeaderMenuElement, new SiteHeaderMenuView().getElement());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
renderTemplate(siteHeaderFilterElement, createSiteHeaderFilterTemplate());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');
// Добавляем сортировку
renderTemplate(siteMainEventsElement, createSiteMainSortingTemplate());
// Добавляем шаблон для точек
renderTemplate(siteMainEventsElement, createSitePointListTemplate());
//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < POINT_COUNTER; i++) {
  renderTemplate(siteMainPointListElement, createSitePointTemplate(points[i]));
}
// Добавляем форму редактирования в начало списка
renderTemplate(siteMainPointListElement, createSitePointEditTemplate(destinations, offers), position.AFTER_BEGIN);
