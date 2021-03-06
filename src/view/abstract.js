import { createElement } from '../utils/render.js';

const ANIMATION_TIMEOUT = 600;
const ANIMATION_TIME = 1000;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getCanvasCtx(selector) {
    return this.getElement().querySelector(selector);
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / ANIMATION_TIME}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, ANIMATION_TIMEOUT);
  }
}
