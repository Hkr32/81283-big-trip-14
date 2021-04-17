import { createElement } from '../utils.js';
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

export default class SiteHeaderNavigation {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createSiteHeaderNavigationTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
