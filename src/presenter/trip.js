import PointPresenter from './point.js';

import MainSortingView from '../view/sorting.js';
import PointListView from '../view/point-list.js';
import PointEmptyListView from '../view/point-list-empty.js';

import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortPointTime, sortPointPrice } from '../utils/point.js';
import { render, remove } from '../utils/render.js';

export default class Trip {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripMainContainer = container.querySelector('.trip-events');
    this._tripPoints = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._sortComponent = null;

    this._pointSortComponent = new MainSortingView();
    this._pointListComponent = new PointListView();
    this._pointEmptyListComponent = new PointEmptyListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointPrice);
    }
    return this._pointsModel.getPoints();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({ resetSortType: true });
        this._renderTrip();
        break;
    }
  }

  _handlePointChange(updatedPoint) {
    // Models update

    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    // ???
    this._clearTrip({ resetSortType: true });
    this._renderTrip();
    // this._clearPointsList();
    // this._renderPointsList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    // @todo wtf?
    this._sortComponent = new MainSortingView(this._currentSortType);
    this._pointSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripMainContainer, this._pointSortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
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
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }

  // @todo resetRenderedTaskCount = false need?
  _clearTrip({ resetSortType = false } = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._pointSortComponent);
    remove(this._pointListComponent);
    remove(this._pointEmptyListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    if (points.length === 0) {
      this._renderNoPoints();

      return;
    }

    this._renderSort();
    // this._renderPointsList();
    this._renderPoints(points.slice());
  }
}
