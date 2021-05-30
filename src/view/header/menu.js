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

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createHeaderMenuTemplate(this._menuItem, this._currentItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    const menu = this.getElement().querySelectorAll('.trip-tabs__btn');
    menu.forEach((item) => {
      item.addEventListener('click', this._menuClickHandler);
    });
  }

  setMenuItem(menuItem) {
    const menu = this.getElement().querySelectorAll('.trip-tabs__btn');
    menu.forEach((item) => {
      item.classList.remove('trip-tabs__btn--active');
    });

    const item = this.getElement().querySelector(`.trip-tabs__btn[data-menu=${menuItem}]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== 'A' && evt.target.dataset.menu === undefined) {
      return;
    }

    evt.preventDefault();

    this._callback.menuClick(evt.target.dataset.menu);
    this.setMenuItem(evt.target.dataset.menu);
  }
}
