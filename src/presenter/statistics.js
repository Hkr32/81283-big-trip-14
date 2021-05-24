import StatisticsMoneyView from '../view/statistics/money.js';
import StatisticsTransportView from '../view/statistics/transport.js';
import StatisticsTimeView from '../view/statistics/time.js';

import { render, remove } from '../utils/render.js';
import {
  BAR_HEIGHT,
  DiagramType,
  calcStatistics,
  sortMoneyDown,
  sortCountDown,
  sortDurationDown
} from '../utils/statistics.js';
import { renderChart } from '../utils/chart.js';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._data = [];
    this._dataLength = 0;

    this._statisticsContainer = container;

    this._statisticsMoneyComponent = new StatisticsMoneyView();
    this._statisticsTransportComponent = new StatisticsTransportView();
    this._statisticsTimeComponent = new StatisticsTimeView();
  }

  _clearStatistics() {
    remove(this._statisticsMoneyComponent);
    remove(this._statisticsTransportComponent);
    remove(this._statisticsTimeComponent);
  }

  _renderStatistics() {
    this._renderStatisticsMoney();
    this._renderStatisticsTransport();
    this._renderStatisticsTime();
  }

  _renderStatisticsMoney() {
    const moneyCtx = this._statisticsMoneyComponent.getElement().querySelector('.statistics__chart--money');
    moneyCtx.height = BAR_HEIGHT * this._dataLength;
    render(this._statisticsContainer, this._statisticsMoneyComponent);
    this._data.sort(sortMoneyDown);
    const data = {
      labels: [],
      data: [],
    };
    this._data.map(([label, { money }]) => {
      data.labels.push(label);
      data.data.push(money);
    });
    renderChart(moneyCtx, data, DiagramType.MONEY);
  }
  _renderStatisticsTransport() {
    const transportCtx = this._statisticsTransportComponent.getElement().querySelector('.statistics__chart--transport');
    transportCtx.height = BAR_HEIGHT * this._dataLength;
    render(this._statisticsContainer, this._statisticsTransportComponent);
    this._data.sort(sortCountDown);
    const data = {
      labels: [],
      data: [],
    };
    this._data.map(([label, { count }]) => {
      data.labels.push(label);
      data.data.push(count);
    });
    renderChart(transportCtx, data, DiagramType.TYPE);
  }
  _renderStatisticsTime() {
    const timeCtx = this._statisticsTimeComponent.getElement().querySelector('.statistics__chart--time');
    timeCtx.height = BAR_HEIGHT * this._dataLength;
    render(this._statisticsContainer, this._statisticsTimeComponent);
    this._data.sort(sortDurationDown);
    const data = {
      labels: [],
      data: [],
    };
    this._data.map(([label, { duration }]) => {
      data.labels.push(label);
      data.data.push(duration);
    });
    renderChart(timeCtx, data, DiagramType.TIME);
  }

  init() {
    // @todo нужно оно тут?
    this._data = calcStatistics(this._pointsModel.getPoints());
    this._dataLength = this._data.length;
    this._clearStatistics();
    this._renderStatistics();
  }

  destroy() {
    this._clearStatistics();
  }
}
