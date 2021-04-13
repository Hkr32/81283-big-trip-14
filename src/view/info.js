import { createElement } from '../utils.js';

const createSiteHeaderInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class SiteHeaderInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteHeaderInfoTemplate();
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
