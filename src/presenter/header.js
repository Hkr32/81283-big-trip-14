import HeaderFilterView from '../view/header/filter.js';
import HeaderInfoView from '../view/header/info.js';
import HeaderNavigationView from '../view/header/navigation.js';
import HeaderCostView from '../view/header/cost.js';

import { Position, UpdateType } from '../utils/const.js';
import { render, remove } from '../utils/render.js';

export default class Header {
  constructor(container, headerMenuComponent, headerModel, pointsModel) {
    this._headerModel = headerModel;
    this._pointsModel = pointsModel;

    this._tripHeaderInfoContainer = null;
    this._tripHeaderTripMainContainer = container;

    this._headerFilterComponent = null;
    this._headerNavigationComponent = null;
    this._headerCostComponent = null;
    this._headerMenuComponent = headerMenuComponent;
    this._headerInfoComponent = new HeaderInfoView();

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._pointsModel.addObserver(this._modelEventHandler);
    this._headerModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._clearHeader();
    this._renderHeader();
  }

  setDisabled(status = true) {
    if (!this._headerFilterComponent) {
      return;
    }

    this._headerFilterComponent.setDisabledStatus(status);
  }

  _renderFilter() {
    if (this._headerFilterComponent !== null) {
      this._headerFilterComponent = null;
    }

    this._headerFilterComponent = new HeaderFilterView(this._headerModel.getFilter(), this._pointsModel.getFutureEmpty(), this._pointsModel.getPastEmpty());
    this._headerFilterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    const filterContainer = this._tripHeaderTripMainContainer.querySelector('.trip-controls__filters');
    render(filterContainer, this._headerFilterComponent);
  }

  _renderMenu() {
    const menuContainer = this._tripHeaderTripMainContainer.querySelector('.trip-controls__navigation');
    render(menuContainer, this._headerMenuComponent);
  }

  _renderMain() {
    render(this._tripHeaderTripMainContainer, this._headerInfoComponent, Position.AFTER_BEGIN);
    this._tripHeaderInfoContainer = this._tripHeaderTripMainContainer.querySelector('.trip-info');
  }

  _renderInfo() {
    if (this._headerNavigationComponent !== null) {
      this._headerNavigationComponent = null;
    }
    if (this._headerCostComponent !== null) {
      this._headerCostComponent = null;
    }

    const points = this._pointsModel.get();

    this._headerNavigationComponent = new HeaderNavigationView(this._headerModel.generateTrip(points));
    this._headerCostComponent = new HeaderCostView(this._headerModel.getSumTrip(points));
    render(this._tripHeaderInfoContainer, this._headerNavigationComponent, Position.AFTER_BEGIN);
    render(this._tripHeaderInfoContainer, this._headerCostComponent);
  }

  _clearHeader() {
    remove(this._headerFilterComponent);
    remove(this._headerNavigationComponent);
    remove(this._headerCostComponent);
  }

  _renderHeader() {
    this._renderMenu();
    this._renderFilter();
    this._renderMain();
    this._renderInfo();
  }

  _modelEventHandler() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (this._headerModel.getFilter() === filterType) {
      return;
    }

    this._headerModel.setFilter(UpdateType.MAJOR, filterType);
    this._clearHeader();
    this._renderHeader();
  }
}
