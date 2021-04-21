import PointPresenter from './point.js';

import SiteMainSortingView from '../view/sorting.js';
import SitePointListView from '../view/point-list.js';
import SitePointEmptyListView from '../view/point-list-empty.js';

import SiteHeaderInfoView from '../view/info.js';
import SiteHeaderNavigationView from '../view/navigation.js';
import SiteHeaderCostView from '../view/cost.js';

import { position } from '../utils/const.js';
import { render } from '../utils/render.js';

export default class Trip {
  constructor(container) {
    this._tripHeaderContainer = container.querySelector('.page-header');
    this._tripMainContainer = container.querySelector('.trip-events');
    this._tripPoints = null;
    this._pointPresenter = {};

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
    const pointPresenter = new PointPresenter(this._pointListComponent);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints
      .slice()
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderNoPoints() {
    render(this._tripMainContainer, this._pointEmptyListComponent);
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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
