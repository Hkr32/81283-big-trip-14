import Observer from '../utils/observer.js';
import { dateFormat } from '../utils/date.js';

const Length = {
  ONE: 1,
  TWO: 2,
  TREE: 3,
};

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

  generateTrip() {
    let title = '';
    let date = '';
    const lengthPoints = this._points.length;
    if (lengthPoints === 0) {
      return { title, date };
    }

    const [first, second, third] = this._points;
    const lastPoint = lengthPoints - 1;

    switch (lengthPoints) {
      case Length.ONE:
        title = first.destination.name;
        break;
      case Length.TWO:
        title = [first.destination.name, second.destination.name].join(' &mdash; ');
        break;
      case Length.TREE:
        title = [first.destination.name, second.destination.name, third.destination.name].join(' &mdash; ');
        break;
      default:
        title = `${first.destination.name} &mdash; ... &mdash; ${this._points[lastPoint].destination.name}`;
        break;
    }

    date = Length.ONE === lengthPoints
      ? dateFormat(first.dateFrom, 'D MMM')
      : `${dateFormat(first.dateFrom, 'D MMM')}&nbsp;&mdash;&nbsp; ${dateFormat(this._points[lastPoint].dateTo, 'D MMM')}`;

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
