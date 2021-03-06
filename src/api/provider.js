import PointsModel from '../model/points.js';

import { isOnline } from '../utils/common.js';
import { DataPostfix, DataIds } from '../utils/store.js';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items, id = DataIds.POINTS) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current[id]]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, DataIds.OFFERS);
          this._store.setItems(items, DataPostfix.OFFERS);

          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems());

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations, DataIds.DESTINATIONS);
          this._store.setItems(items, DataPostfix.DESTINATIONS);

          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems(DataPostfix.DESTINATIONS));

    return Promise.resolve(storeDestinations);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer), DataIds.POINTS);
          this._store.setItems(items, DataPostfix.POINTS);

          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(DataPostfix.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api
        .updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api
        .addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api
        .deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints], DataIds.POINTS);

          this._store.setItems(items, DataPostfix.POINTS);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
