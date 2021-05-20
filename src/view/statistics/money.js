import AbstractView from '../abstract.js';

const createStatisticsMoneyTemplate = () => {
  return `<div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>`;
};

export default class StatisticsMoney extends AbstractView {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createStatisticsMoneyTemplate();
  }
}
