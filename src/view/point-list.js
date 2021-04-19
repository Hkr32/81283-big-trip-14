import { createElement } from '../utils.js';

const createSitePointListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class SitePointList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSitePointListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
