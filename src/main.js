import { createSiteHeaderMenuTemplate } from './view/menu.js';
import { createSiteHeaderInfoTemplate } from './view/info.js';
import { createSiteHeaderNavigationTemplate } from './view/navigation.js';
import { createSiteHeaderCostTemplate } from './view/cost.js';
import { createSiteHeaderFilterTemplate } from './view/filter.js';
import { createSiteMainSortingTemplate } from './view/sorting.js';
import { createSitePointListTemplate } from './view/point-list.js';
import { createSitePointTemplate } from './view/point.js';
import { createSitePointEditTemplate } from './view/point-edit.js';

// Количество точек на главной
const COUNTER = 3;

// Функция для отображения данных на странице
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');
// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
render(siteHeaderTripMainElement, createSiteHeaderInfoTemplate(), 'afterbegin');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderInfoElement, createSiteHeaderNavigationTemplate(), 'afterbegin');
render(siteHeaderInfoElement, createSiteHeaderCostTemplate(), 'beforeend');
// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteHeaderMenuElement, createSiteHeaderMenuTemplate(), 'beforeend');
// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, createSiteHeaderFilterTemplate(), 'beforeend');

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');
// Добавляем сортировку
render(siteMainEventsElement, createSiteMainSortingTemplate(), 'beforeend');
// Добавляем шаблон для точек
render(siteMainEventsElement, createSitePointListTemplate(), 'beforeend');
//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < COUNTER; i++) {
  render(siteMainPointListElement, createSitePointTemplate(), 'beforeend');
}
// Добавляем форму редактирования в начало списка
render(siteMainPointListElement, createSitePointEditTemplate(), 'afterbegin');
