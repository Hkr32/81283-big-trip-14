import Observer from '../utils/observer.js';
import { dateFormat } from '../utils/date.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  getSumTrip() {
    return this._points.reduce((sum, point) => sum + point.basePrice, 0);
  }

  generateTrip () {
    let title = '';
    let date = '';

    this._points.map((point, index, points) => {
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
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot update non existing point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete non existing point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
