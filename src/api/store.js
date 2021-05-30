
import { DataPostfix } from '../utils/store.js';

export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems(postfix = DataPostfix.POINTS) {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey + postfix)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, postfix) {
    this._storage.setItem(
      this._storeKey + postfix,
      JSON.stringify(items),
    );
  }

  setItem(key, value, postfix = DataPostfix.POINTS) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey + postfix,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  removeItem(key, postfix = DataPostfix.POINTS) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey + postfix,
      JSON.stringify(store),
    );
  }
}
