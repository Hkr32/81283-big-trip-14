import AbstractView from './abstract.js';
import { dateFormat } from '../utils.js';

const generateTrip = (points) => {
  let title = '';
  let date = '';

  points.map((point, index, points) => {
    if (index === 0) {
      title += point.destination.name;
      date += dateFormat(point.dateFrom, 'D MMM');
    }

    if (index === 1 && points.length > 3) {
      title += ' &mdash; ... ';
    }

    if (index === 1 && points.length === 3) {
      title += ' &mdash; ' + point.destination.name;
    }

    if (index !== 0 && index === points.length - 1) {
      title += ' &mdash; ' + point.destination.name;
      date += '&nbsp;&mdash;&nbsp;' + dateFormat(point.dateTo, 'D MMM');
    }
  });

  return { title, date };
};

const createSiteHeaderNavigationTemplate = (points) => {
  const { title, date } = generateTrip(points);

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>

    <p class="trip-info__dates">${date}</p>
  </div>`;
};

export default class SiteHeaderNavigation extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createSiteHeaderNavigationTemplate(this._points);
  }
}
