import AbstractView from '../abstract.js';

const createHeaderCostTemplate = (cost) => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class HeaderCost extends AbstractView {
  constructor(cost) {
    super();

    this._cost = cost;
  }

  getTemplate() {
    return createHeaderCostTemplate(this._cost);
  }
}
