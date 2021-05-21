import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import StatisticsMoneyView from '../view/statistics/money.js';
import StatisticsTransportView from '../view/statistics/transport.js';
import StatisticsTimeView from '../view/statistics/time.js';

import { render, remove } from '../utils/render.js';
import { BAR_HEIGHT, sortMoneyDown, sortCountDown, sortDurationDown } from '../utils/statistics.js';
import { dateDiffInMinutes } from '../utils/date.js';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._data = this._calcStatistics(this._pointsModel.getPoints());
    this._dataLength = this._data.length;

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
    const moneyCtx = this._statisticsMoneyComponent.getElement().querySelector('.statistics__chart--money');
    moneyCtx.height = BAR_HEIGHT * this._dataLength;
    render(this._statisticsContainer, this._statisticsMoneyComponent);
    const sortArray = this._data.sort(sortMoneyDown);
    const data = {
      labels: sortArray.map((item) => item[0]),
      data: sortArray.map((item) => item[1].money),
    };
    this._renderChart(moneyCtx, data, 'MONEY');
  }
  _renderStatisticsTransport() {
    const transportCtx = this._statisticsTransportComponent.getElement().querySelector('.statistics__chart--transport');
    transportCtx.height = BAR_HEIGHT * 5;
    render(this._statisticsContainer, this._statisticsTransportComponent);
    // this._renderChart(transportCtx, this._points);
  }
  _renderStatisticsTime() {
    const timeCtx = this._statisticsTimeComponent.getElement().querySelector('.statistics__chart--time');
    timeCtx.height = BAR_HEIGHT * 5;
    render(this._statisticsContainer, this._statisticsTimeComponent);
    // this._renderChart(timeCtx, this._points);
  }

  _renderChart(ctx, data, title) {
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: title,
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _calcStatistics(points) {
    const calc = new Map();
    points.map(({ type, basePrice, dateFrom, dateTo }) => {
      const typeValue = calc.get(type);
      if (!typeValue) {
        calc.set(type, {
          money: basePrice,
          count: 1,
          duration: (dateDiffInMinutes(dateFrom, dateTo)),
        });
      } else {
        typeValue.money += +basePrice;
        typeValue.count += +1;
        typeValue.duration += +(dateDiffInMinutes(dateFrom, dateTo));
      }
    });

    // const calcArray = Array.from(calc.entries());

    // calcArray.sort(sortMoneyDown);

    // console.log(calcArray)

    return Array.from(calc.entries());
  }

  init() {
    this._clearStatistics();
    this._renderStatistics();
  }

  destroy() {
    this._clearStatistics();
  }
}
