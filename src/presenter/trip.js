import SiteMainSortingView from '../view/sorting.js';
import SitePointListView from '../view/point-list.js';
import SitePointEmptyListView from '../view/point-list-empty.js';
import SitePointView from '../view/point.js';
import SitePointEditView from '../view/point-edit.js';

import SiteHeaderInfoView from '../view/info.js';
import SiteHeaderNavigationView from '../view/navigation.js';
import SiteHeaderCostView from '../view/cost.js';

import { POINT_COUNTER, position } from '../utils/const.js';
import { isEscKey } from '../utils/common.js';
import { render, replace, remove } from '../utils/render.js';

import { offers, destinations } from '../mock/const.js';

export default class Trip {
  constructor(container) {
    this._tripHeaderContainer = container.querySelector('.page-header');
    this._tripMainContainer = container.querySelector('.trip-events');
    this._tripPoints = null;

    this._pointSortComponent = new SiteMainSortingView();
    this._pointListComponent = new SitePointListView();
    this._pointEmptyListComponent = new SitePointEmptyListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
    this._renderHeader();
  }

  _renderSort() {
    render(this._tripMainContainer, this._pointSortComponent);
  }

  _renderPoint(point) {
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

    render(this._pointListComponent, pointComponent);
  }

  _renderPoints() {
    this._tripPoints
      .slice()
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderNoPoints() {
    render(this._tripMainContainer, this._pointEmptyListComponent);
  }

  _renderPointsList() {
    render(this._tripMainContainer, this._pointListComponent);
    this._renderPoints(this._tripPoints);
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderNoPoints();

      return;
    }

    this._renderSort();
    this._renderPointsList();
  }

  _renderHeader() {
    const siteHeaderTripMainElement = this._tripHeaderContainer.querySelector('.trip-main');
    const headerInfoComponent = new SiteHeaderInfoView();
    render(siteHeaderTripMainElement, headerInfoComponent, position.AFTER_BEGIN);
    const siteHeaderInfoElement = this._tripHeaderContainer.querySelector('.trip-info');
    const headerNavigationComponent = new SiteHeaderNavigationView(this._tripPoints);
    const headerCostComponent = new SiteHeaderCostView(this._tripPoints);
    render(siteHeaderInfoElement, headerNavigationComponent, position.AFTER_BEGIN);
    render(siteHeaderInfoElement, headerCostComponent);
  }
}
