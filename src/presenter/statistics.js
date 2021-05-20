import StatisticsMoneyView from '../view/statistics/money.js';
import StatisticsTransportView from '../view/statistics/transport.js';
import StatisticsTimeView from '../view/statistics/time.js';

import { render, remove } from '../utils/render.js';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._points = this._pointsModel.getPoints();

    this._statisticsContainer = container;

    this._statisticsMoneyComponent = new StatisticsMoneyView(this._points);
    this._statisticsTransportComponent = new StatisticsTransportView(this._points);
    this._statisticsTimeComponent = new StatisticsTimeView(this._points);
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
    render(this._statisticsContainer, this._statisticsMoneyComponent);
  }
  _renderStatisticsTransport() {
    render(this._statisticsContainer, this._statisticsTransportComponent);
  }
  _renderStatisticsTime() {
    render(this._statisticsContainer, this._statisticsTimeComponent);
  }

  init() {
    this._clearStatistics();
    this._renderStatistics();
  }

  destroy() {
    this._clearStatistics();
  }
}
