import PointPresenter, {State as PointPresenterViewState} from './point.js';
import PointNewPresenter from './point-new.js';

import LoadingView from '../view/loading.js';
import MainSortingView from '../view/sorting.js';
import PointListView from '../view/point-list.js';
import PointEmptyListView from '../view/point-list-empty.js';

import { SortType, FilterType, UpdateType, UserAction } from '../utils/const.js';
import { sortPointTime, sortPointPrice, filterPointsFuture, filterPointsPast } from '../utils/point.js';
import { render, remove } from '../utils/render.js';

export default class Trip {
  constructor(container, headerModel, pointsModel, api) {
    this._headerModel = headerModel;
    this._pointsModel = pointsModel;

    this._tripPoints = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;

    this._tripMainContainer = container;

    this._pointSortComponent = null;
    this._pointListComponent = new PointListView();
    this._pointEmptyListComponent = new PointEmptyListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction, this._pointsModel);
  }

  init() {
    this._renderTrip();

    this._headerModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearTrip({ resetSortType: true, resetFilterType: true });

    remove(this._pointListComponent);

    this._headerModel.removeObserver(this._handleModelEvent);
    this._pointsModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DAY;
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    const filterType = this._headerModel.getFilter();
    let points = this._pointsModel.getPoints();

    switch (filterType) {
      case FilterType.FUTURE:
        points = filterPointsFuture(points);

        break;
      case FilterType.PAST:
        points = filterPointsPast(points);

        break;
    }

    switch (this._currentSortType) {
      case SortType.TIME:
        points.sort(sortPointTime);

        break;
      case SortType.PRICE:
        points.sort(sortPointPrice);

        break;
    }

    return points;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

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

  _renderLoading() {
    render(this._tripMainContainer, this._loadingComponent);
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
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange, this._pointsModel);
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

  _clearTrip({ resetSortType = false, resetFilterType = false } = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._loadingComponent);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();

      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
