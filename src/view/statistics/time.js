import AbstractView from '../abstract.js';

const createStatisticsTimeTemplate = () => {
  return `<div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>`;
};

export default class StatisticsTime extends AbstractView {
  getTemplate() {
    return createStatisticsTimeTemplate();
  }
}
