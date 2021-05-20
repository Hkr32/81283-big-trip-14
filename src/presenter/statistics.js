import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import StatisticsMoneyView from '../view/statistics/money.js';
import StatisticsTransportView from '../view/statistics/transport.js';
import StatisticsTimeView from '../view/statistics/time.js';

import { render, remove } from '../utils/render.js';
import { BAR_HEIGHT, sortDown } from '../utils/statistics.js';
import { dateDiffInMinutes } from '../utils/date.js';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._data = this._calcStatistics(this._pointsModel.getPoints());

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
    moneyCtx.height = BAR_HEIGHT * 5;
    render(this._statisticsContainer, this._statisticsMoneyComponent);
    console.log(this._data)
    this._renderChart(moneyCtx, this._data, 'MONEY');
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
        labels: Object.keys(data),
        datasets: [{
          data: data,
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
            formatter: (val) => '€ ${val}',
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
    // const calc = {
    //   labels: [],
    //   money: [],
    //   count: [],
    //   duration: [],
    // };
    // points.map(({ type, basePrice, dateFrom, dateTo }) => {
    //   if (calc.money[type] === undefined) {
    //     calc.labels.push(type);
    //     calc.money[type] = +basePrice;
    //     calc.count[type] = +1;
    //     calc.duration[type] = +(dateDiffInMinutes(dateFrom, dateTo));
    //   } else {
    //     calc.labels.push(type);
    //     calc.money[type] += +basePrice;
    //     calc.count[type] += +1;
    //     calc.duration[type] += +(dateDiffInMinutes(dateFrom, dateTo));
    //   }
    // });
    const calc = [];
    points.map(({ type, basePrice, dateFrom, dateTo }) => {
      if (calc[type] === undefined) {
        calc[type] = {
          money: basePrice,
          count: 1,
          duration: (dateDiffInMinutes(dateFrom, dateTo)),
        };
      } else {
        calc[type].money += +basePrice;
        calc[type].count += +1;
        calc[type].duration += +(dateDiffInMinutes(dateFrom, dateTo));
      }
    });

    // calc.labels = [...new Set(calc.labels)];

    // calc.money.sort((a, b) => a - b);
    calc.sort(((a, b) => b.money - a.money));

    console.log(calc)

    return calc;
  }

  init() {
    this._clearStatistics();
    this._renderStatistics();
  }

  destroy() {
    this._clearStatistics();
  }
}
