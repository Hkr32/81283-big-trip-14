import PointPresenter from './point.js';

import MainSortingView from '../view/sorting.js';
import PointListView from '../view/point-list.js';
import PointEmptyListView from '../view/point-list-empty.js';

import HeaderInfoView from '../view/info.js';
import HeaderNavigationView from '../view/navigation.js';
import HeaderCostView from '../view/cost.js';

import { position } from '../utils/const.js';
import { render } from '../utils/render.js';

export default class Trip {
  constructor(container) {
    this._tripHeaderContainer = container.querySelector('.page-header');
    this._tripMainContainer = container.querySelector('.trip-events');
    this._tripPoints = null;
    this._pointPresenter = {};

    this._pointSortComponent = new MainSortingView();
    this._pointListComponent = new PointListView();
    this._pointEmptyListComponent = new PointEmptyListView();
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
    const headerTripMainElement = this._tripHeaderContainer.querySelector('.trip-main');
    const headerInfoComponent = new HeaderInfoView();
    render(headerTripMainElement, headerInfoComponent, position.AFTER_BEGIN);
    const headerInfoElement = this._tripHeaderContainer.querySelector('.trip-info');
    const headerNavigationComponent = new HeaderNavigationView(this._tripPoints);
    const headerCostComponent = new HeaderCostView(this._tripPoints);
    render(headerInfoElement, headerNavigationComponent, position.AFTER_BEGIN);
    render(headerInfoElement, headerCostComponent);
  }
}
