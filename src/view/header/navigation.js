import AbstractView from '../abstract.js';

const createHeaderNavigationTemplate = (title, date) => {

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>
    <p class="trip-info__dates">${date}</p>
  </div>`;
};

export default class HeaderNavigation extends AbstractView {
  constructor({ title, date }) {
    super();

    this._title = title;
    this._date = date;
  }

  getTemplate() {
    return createHeaderNavigationTemplate(this._title, this._date);
  }
}
