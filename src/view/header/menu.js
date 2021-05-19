import AbstractView from '../abstract.js';

import { MenuItem } from '../../utils/const.js';

const createHeaderMenuTemplate = (menuItem, currentItem) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${menuItem.TABLE === currentItem ? 'trip-tabs__btn--active' : ''}" href="#" data-menu="${menuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn ${menuItem.STATISTICS === currentItem ? 'trip-tabs__btn--active' : ''}" href="#" data-menu="${menuItem.STATISTICS}">Stats</a>
  </nav>`;
};

export default class HeaderMenu extends AbstractView {
  constructor() {
    super();

    this._menuItem = MenuItem;
    this._currentItem = MenuItem.TABLE;

    this._changeSiteMenuClick = this._changeSiteMenuClick.bind(this);

    this.setClickMenuHandler();
  }

  _changeSiteMenuClick(evt) {
    if (evt.target.tagName !== 'A' && evt.target.dataset.menu === undefined) {
      return;
    }

    evt.preventDefault();

    console.log(evt.target.dataset.menu)
  }

  setClickMenuHandler() {
    const menu = this.getElement().querySelectorAll('.trip-tabs__btn');
    menu.forEach((item) => {
      item.addEventListener('click', this._changeSiteMenuClick);
    });
  }

  getTemplate() {
    return createHeaderMenuTemplate(this._menuItem, this._currentItem);
  }
}
