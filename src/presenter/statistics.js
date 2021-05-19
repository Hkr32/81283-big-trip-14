import StatisticsView from '../view/statistics.js';

import { render, remove } from '../utils/render.js';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;

    this._statisticsContainer = container;

    this._statisticsComponent = new StatisticsView();

  }

  _clearStatistics() {
    remove(this._statisticsComponent);
  }

  _renderStatistics() {
    this._statisticsComponent = new StatisticsView();
    render(this._statisticsContainer, this._statisticsComponent);
  }

  init() {
    this._clearStatistics();
    this._renderStatistics();
  }
}
