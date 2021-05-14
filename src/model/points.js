import Observer from '../utils/observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._displayedPoints = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  setDisplayedPoints(points) {
    this._displayedPoints = points.slice();
  }

  getPoints() {
    return this._points.slice();
  }

  getDisplayedPoints() {
    return this._displayedPoints;
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
