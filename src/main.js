// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';
import { offers, destinations } from './mock/const.js';

import { POINT_COUNTER, position } from './utils/const.js';
import { isEscKey } from './utils/common.js';
import { render, replace } from './utils/render.js';

import SiteHeaderInfoView from './view/info.js';
import SiteHeaderNavigationView from './view/navigation.js';
import SiteHeaderCostView from './view/cost.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderFilterView from './view/filter.js';
import SiteMainSortingView from './view/sorting.js';
import SitePointEmptyListView from './view/point-list-empty.js';
import SitePointListView from './view/point-list.js';
import SitePointView from './view/point.js';
import SitePointEditView from './view/point-edit.js';

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

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

// Отрисовка точки
const renderPoint = (pointListElement, point) => {
  const pointComponent = new SitePointView(point);
  const pointEditComponent = new SitePointEditView(destinations, offers, point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (isEscKey) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent);
};

// Функция отрисовки точек
const renderPoints = (points) => {
  if (points.length === 0) {
    render(siteMainEventsElement, new SitePointEmptyListView());

    return;
  }

  // Добавляем шаблон для маршрута и стоимости
  const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
  render(siteHeaderTripMainElement, new SiteHeaderInfoView(), position.AFTER_BEGIN);
  const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
  render(siteHeaderInfoElement, new SiteHeaderNavigationView(points), position.AFTER_BEGIN);
  render(siteHeaderInfoElement, new SiteHeaderCostView(points));

  // Добавляем сортировку
  render(siteMainEventsElement, new SiteMainSortingView());

  // Добавляем шаблон для точек
  const siteMainPointListElement = new SitePointListView();
  render(siteMainEventsElement, siteMainPointListElement);
  //Добавляем точки в список
  for (let i = 0; i < POINT_COUNTER; i++) {
    renderPoint(siteMainPointListElement, points[i]);
  }
};

// Вызов отрисовки точек
renderPoints(points);
