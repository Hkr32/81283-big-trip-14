// @todo Удалить после того как будут реальные данные
import { generatePoint } from './mock/point.js';
import { offers, destinations } from './mock/const.js';

import { POINT_COUNTER, position, KeyType } from './utils/const.js';
import { render } from './utils/render.js';

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
render(siteHeaderMenuElement, new SiteHeaderMenuView().getElement());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, new SiteHeaderFilterView().getElement());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

//
const renderPoint = (pointListElement, point) => {
  const pointComponent = new SitePointView(point);
  const pointEditComponent = new SitePointEditView(destinations, offers, point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  // @todo вынести проверку в отдельную функцию
  const onEscKeyDown = (evt) => {
    if (evt.key === KeyType.ESCAPE || evt.key === KeyType.ESC) {
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

  render(pointListElement, pointComponent.getElement());
};

const renderPoints = (points) => {
  if (points.length === 0) {
    render(siteMainEventsElement, new SitePointEmptyListView().getElement());

    return;
  }

  // Добавляем шаблон для маршрута и стоимости
  const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
  render(siteHeaderTripMainElement, new SiteHeaderInfoView().getElement(), position.AFTER_BEGIN);
  const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
  render(siteHeaderInfoElement, new SiteHeaderNavigationView(points).getElement(), position.AFTER_BEGIN);
  render(siteHeaderInfoElement, new SiteHeaderCostView(points).getElement());

  // Добавляем сортировку
  render(siteMainEventsElement, new SiteMainSortingView().getElement());

  // Добавляем шаблон для точек
  const siteMainPointListElement = new SitePointListView().getElement();
  render(siteMainEventsElement, siteMainPointListElement);
  //Добавляем точки в список
  for (let i = 0; i < POINT_COUNTER; i++) {
    renderPoint(siteMainPointListElement, points[i]);
  }
};

renderPoints(points);
