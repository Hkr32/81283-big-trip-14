import SitePointView from '../view/point.js';
import SitePointEditView from '../view/point-edit.js';

import { position } from '../utils/const.js';
import { isEscKey } from '../utils/common.js';
import { render, replace } from '../utils/render.js';

import { offers, destinations } from '../mock/const.js';

export default class Point {
  constructor(container) {
    this._pointListComponent = container;
    this._tripPoint = null;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._tripPoint = point;

    this._pointComponent = new SitePointView(point);
    this._pointEditComponent = new SitePointEditView(destinations, offers, point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._pointListComponent, this._pointComponent);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscKey) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}
