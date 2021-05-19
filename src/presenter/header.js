import HeaderMenuView from '../view/header/menu.js';
import HeaderFilterView from '../view/header/filter.js';
import HeaderInfoView from '../view/header/info.js';
import HeaderNavigationView from '../view/header/navigation.js';
import HeaderCostView from '../view/header/cost.js';

import { position, UpdateType } from '../utils/const.js';
import { render, remove } from '../utils/render.js';

export default class Header {
  constructor(container, headerModel, pointsModel) {
    this._headerModel = headerModel;
    this._pointsModel = pointsModel;

    this._tripHeaderInfoContainer = null;
    this._tripHeaderTripMainContainer = container;

    this._headerFilterComponent = null;
    this._headerNavigationComponent = null;
    this._headerCostComponent = null;
    this._headerMenuComponent = new HeaderMenuView();
    this._headerInfoComponent = new HeaderInfoView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._headerModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._headerModel.getFilter() === filterType) {
      return;
    }

    this._headerModel.setFilter(UpdateType.MAJOR, filterType);
    this._clearHeader();
    this._renderHeader();
  }

  _renderFilter() {
    if (this._headerFilterComponent !== null) {
      this._headerFilterComponent = null;
    }

    this._headerFilterComponent = new HeaderFilterView(this._headerModel.getFilter());
    this._headerFilterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    const filterContainer = this._tripHeaderTripMainContainer.querySelector('.trip-controls__filters');
    render(filterContainer, this._headerFilterComponent);
  }

  _renderMenu() {
    const menuContainer = this._tripHeaderTripMainContainer.querySelector('.trip-controls__navigation');
    render(menuContainer, this._headerMenuComponent);
  }

  _renderMain() {
    render(this._tripHeaderTripMainContainer, this._headerInfoComponent, position.AFTER_BEGIN);
    this._tripHeaderInfoContainer = this._tripHeaderTripMainContainer.querySelector('.trip-info');
  }

  _renderInfo() {
    if (this._headerNavigationComponent !== null) {
      this._headerNavigationComponent = null;
    }
    if (this._headerCostComponent !== null) {
      this._headerCostComponent = null;
    }

    const points = this._pointsModel.getPoints();

    this._headerNavigationComponent = new HeaderNavigationView(this._headerModel.generateTrip(points));
    this._headerCostComponent = new HeaderCostView(this._headerModel.getSumTrip(points));
    render(this._tripHeaderInfoContainer, this._headerNavigationComponent, position.AFTER_BEGIN);
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

  init() {
    this._clearHeader();
    this._renderHeader();
  }
}
