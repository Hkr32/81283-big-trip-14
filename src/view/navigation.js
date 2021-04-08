import { dateFormat } from '../utils.js';

const generateTrip = (points) => {
  const trip = {
    title: '',
    date: '',
  };

  points.map((point, index, points) => {
    if (index === 0) {
      trip.title += point.city;
      trip.date += dateFormat(point.dateFrom, 'D MMM');
    }

    if (index === 1 && points.length > 3) {
      trip.title += ' &mdash; ... ';
    }

    if (index === 1 && points.length === 3) {
      trip.title += ' &mdash; ' + point.city;
    }

    if (index !== 0 && index === points.length - 1) {
      trip.title += ' &mdash; ' + point.city;
      trip.date += '&nbsp;&mdash;&nbsp;' + dateFormat(point.dateTo, 'D MMM');
    }
  });

  return trip;
};

export const createSiteHeaderNavigationTemplate = (points) => {
  const trip = generateTrip(points);

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${trip.title}</h1>

    <p class="trip-info__dates">${trip.date}</p>
  </div>`;
};
