import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { DiagramType } from '../utils/statistics.js';
import { dateToDurationString } from '../utils/date.js';

// Отрисовка диаграммы
export const renderChart = (ctx, data, title) => {
  const params = {
    left: '',
    right: '',
  };

  switch (title) {
    case DiagramType.MONEY:
      params.left = '€ ';
      break;
    case DiagramType.TYPE:
      params.right = 'x';
      break;
  }

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
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
        },
      ],
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
          formatter: (val) => `${DiagramType.TIME === title ? dateToDurationString(val) : (params.left + val + params.right)}`,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
