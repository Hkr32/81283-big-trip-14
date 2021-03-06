import Observer from '../utils/observer.js';
import { sortPointDate } from '../utils/point.js';
import { checkDateInFuture, checkDateInPast } from '../utils/date.js';

export default class Points extends Observer {
  constructor() {
    super();

    this._points = [];
    this._offers = [];
    this._destinations = [];
    this._isFutureEmpty = null;
    this._isPastEmpty = null;
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations.slice();
  }

  getFutureEmpty() {
    return this._isFutureEmpty;
  }

  getPastEmpty() {
    return this._isPastEmpty;
  }

  set(updateType, points) {
    this._points = points.slice();
    this.checkFuturePoints();
    this.checkPastPoints();

    this._notify(updateType);
  }

  get() {
    return this._points.sort(sortPointDate);
  }

  update(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot update non existing point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];
    this.checkFuturePoints();
    this.checkPastPoints();

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];
    this.checkFuturePoints();
    this.checkPastPoints();

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete non existing point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];
    this.checkFuturePoints();
    this.checkPastPoints();

    this._notify(updateType);
  }

  checkFuturePoints() {
    this._isFutureEmpty = !this._points.some((point) => {
      return checkDateInFuture(point.dateFrom, point.dateTo);
    });
  }

  checkPastPoints() {
    this._isPastEmpty = !this._points.some((point) => {
      return checkDateInPast(point.dateFrom, point.dateTo);
    });
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
        dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
        basePrice: point.base_price,
        isFavorite: point.is_favorite,
      },
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
        'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
        'base_price': point.basePrice,
        'is_favorite': point.isFavorite,
      },
    );

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
