import PointPresenter from './point.js';

import MainSortingView from '../view/sorting.js';
import PointListView from '../view/point-list.js';
import PointEmptyListView from '../view/point-list-empty.js';

import { SortType, FilterType, UpdateType, UserAction } from '../utils/const.js';
import { sortPointTime, sortPointPrice, filterPointsFuture, filterPointsPast } from '../utils/point.js';
import { render, remove } from '../utils/render.js';

export default class Trip {
  constructor(container, headerModel, pointsModel) {
    this._headerModel = headerModel;
    this._pointsModel = pointsModel;

    this._tripPoints = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripMainContainer = container.querySelector('.trip-events');

    this._pointSortComponent = null;
    this._pointListComponent = new PointListView();
    this._pointEmptyListComponent = new PointEmptyListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._headerModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    const filterType = this._headerModel.getFilter();
    let points = this._pointsModel.getPoints().slice();

    switch (filterType) {
      case FilterType.FUTURE:
        points = filterPointsFuture(points);

        break;
      case FilterType.PAST:
        points = filterPointsPast(points);

        break;
    }

    // @todo переделать сортировку, походу должно идти все от больше к меньшему???
    switch (this._currentSortType) {
      case SortType.TIME:
        return points.sort(sortPointTime);
      case SortType.PRICE:
        return points.sort(sortPointPrice);
    }

    return points;
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
        this._clearTrip({ resetSortType: true, resetFilterType: true });
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
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._pointSortComponent !== null) {
      this._pointSortComponent = null;
    }

    this._pointSortComponent = new MainSortingView(this._currentSortType);
    this._pointSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripMainContainer, this._pointSortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderNoPoints() {
    render(this._tripMainContainer, this._pointEmptyListComponent);
  }

  _renderPoints(points) {
    render(this._tripMainContainer, this._pointListComponent);
    points.forEach((point) => this._renderPoint(point));
  }

  // @todo resetRenderedTaskCount = false need?
  _clearTrip({ resetSortType = false, resetFilterType = false } = {}) {
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
    if (resetFilterType) {
      this._currentFilterType = FilterType.EVERYTHING;
    }
  }

  _renderTrip() {
    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();

      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
