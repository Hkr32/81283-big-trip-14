import AbstractView from './abstract.js';

const createHeaderCostTemplate = (points) => {
  const cost = points.reduce((sum, point) => sum + point.basePrice, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class HeaderCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createHeaderCostTemplate(this._points);
  }
}
