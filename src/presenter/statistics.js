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

  init() {
    this._data = calcStatistics(this._pointsModel.get());
    this._dataLength = this._data.length;
    this._clearStatistics();
    this._renderStatistics();
  }

  destroy() {
    this._clearStatistics();
  }

  _clearStatistics() {
    remove(this._statisticsMoneyComponent);
    remove(this._statisticsTransportComponent);
    remove(this._statisticsTimeComponent);
  }

  _renderStatistics() {
    this._renderChart(
      this._statisticsMoneyComponent.getElement().querySelector('.statistics__chart--money'),
      this._statisticsMoneyComponent,
      sortMoneyDown,
      DiagramType.MONEY,
      'money',
    );
    this._renderChart(
      this._statisticsTransportComponent.getElement().querySelector('.statistics__chart--transport'),
      this._statisticsTransportComponent,
      sortCountDown,
      DiagramType.TYPE,
      'count',
    );
    this._renderChart(
      this._statisticsTimeComponent.getElement().querySelector('.statistics__chart--time'),
      this._statisticsTimeComponent,
      sortDurationDown,
      DiagramType.TIME,
      'duration',
    );
  }

  _renderChart(ctx, component, sortFunction, type, name) {
    ctx.height = BAR_HEIGHT * this._dataLength;
    render(this._statisticsContainer, component);
    this._data.sort(sortFunction);
    const data = {
      labels: [],
      data: [],
    };
    this._data.map(([label, value]) => {
      data.labels.push(label);
      data.data.push(value[name]);
    });
    renderChart(ctx, data, type);
  }
}
