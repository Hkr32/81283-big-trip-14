import { createElement } from '../utils.js';

const createSiteHeaderCostTemplate = (points) => {
  const cost = points.reduce((sum, point) => sum + point.basePrice, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class SiteHeaderCost {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createSiteHeaderCostTemplate(this._points);
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
