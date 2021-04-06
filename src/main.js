import { POINT_COUNTER, position } from './const.js';
import { createSiteHeaderMenuTemplate } from './view/menu.js';
import { createSiteHeaderInfoTemplate } from './view/info.js';
import { createSiteHeaderNavigationTemplate } from './view/navigation.js';
import { createSiteHeaderCostTemplate } from './view/cost.js';
import { createSiteHeaderFilterTemplate } from './view/filter.js';
import { createSiteMainSortingTemplate } from './view/sorting.js';
import { createSitePointListTemplate } from './view/point-list.js';
import { createSitePointTemplate } from './view/point.js';
import { createSitePointEditTemplate } from './view/point-edit.js';


import { generatePoint } from './mock/point.js';

const points = new Array(POINT_COUNTER).fill().map(generatePoint);
console.log(points);

// Функция для отображения данных на странице
const render = (container, template, place = position.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');
// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
render(siteHeaderTripMainElement, createSiteHeaderInfoTemplate(), position.AFTER_BEGIN);
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderInfoElement, createSiteHeaderNavigationTemplate(), position.AFTER_BEGIN);
render(siteHeaderInfoElement, createSiteHeaderCostTemplate());
// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteHeaderMenuElement, createSiteHeaderMenuTemplate());
// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, createSiteHeaderFilterTemplate());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');
// Добавляем сортировку
render(siteMainEventsElement, createSiteMainSortingTemplate());
// Добавляем шаблон для точек
render(siteMainEventsElement, createSitePointListTemplate());
//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < POINT_COUNTER; i++) {
  render(siteMainPointListElement, createSitePointTemplate(points[i]));
}
// Добавляем форму редактирования в начало списка
render(siteMainPointListElement, createSitePointEditTemplate(), position.AFTER_BEGIN);
