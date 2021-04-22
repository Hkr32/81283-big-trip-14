import HeaderMenuView from '../view/menu.js';
import HeaderFilterView from '../view/filter.js';
import HeaderInfoView from '../view/info.js';
import HeaderNavigationView from '../view/navigation.js';
import HeaderCostView from '../view/cost.js';

import { position } from '../utils/const.js';
import { render } from '../utils/render.js';

export default class Trip {
  constructor(container) {
    this._tripHeaderTripMainContainer = container.querySelector('.trip-main');
    this._tripHeaderInfoContainer = null;
    this._tripPoints = null;

    this._headerMenuComponent = new HeaderMenuView();
    this._headerFilterComponent = new HeaderFilterView();
    this._headerInfoComponent = new HeaderInfoView();
    this._headerNavigationComponent = null;
    this._headerCostComponent = null;
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._headerNavigationComponent = new HeaderNavigationView(this._tripPoints);
    this._headerCostComponent = new HeaderCostView(this._tripPoints);

    this._renderMenu();
    this._renderFilter();
    this._renderMain();
    this._renderInfo();
  }

  _renderFilter() {
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
    render(this._tripHeaderInfoContainer, this._headerNavigationComponent, position.AFTER_BEGIN);
    render(this._tripHeaderInfoContainer, this._headerCostComponent);
  }
}
