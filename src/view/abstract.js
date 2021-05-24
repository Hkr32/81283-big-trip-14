import { createElement } from '../utils/render.js';

const ANIMATION_TIMEOUT = 600;

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

  removeElement() {
    this._element = null;
  }

  // @todo удалить?
  showElement(hiddenClass) {
    this._element.classList.add(hiddenClass);
  }

  // @todo удалить?
  hideElement(hiddenClass) {
    this._element.classList.remove(hiddenClass);
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, ANIMATION_TIMEOUT);
  }
}
