import AbstractView from '../abstract.js';

const createStatisticsTransportTemplate = () => {
  return `<div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>`;
};

export default class StatisticsTransport extends AbstractView {
  getTemplate() {
    return createStatisticsTransportTemplate();
  }
}
