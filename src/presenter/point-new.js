import PointEditView from '../view/point-edit.js';

import { remove, render } from '../utils/render.js';
import { UserAction, UpdateType, position } from '../utils/const.js';

export default class PointNew {
  constructor(pointListContainer, changeData, pointsModel) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointsModel = pointsModel;

    this._destroyCallback = null;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(this._pointsModel.getDestinations(), this._pointsModel.getOffers());
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, position.AFTER_BEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    if (this._validate(point)) {
      this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point,
      );
    } else {
      this.setAborting();
    }
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _validate(point) {
    let errors = 0;
    if (!point.destination.name) {
      errors++;
    }
    if (!point.dateFrom) {
      errors++;
    }
    if (!point.dateTo) {
      errors++;
    }
    if (point.basePrice < 1) {
      errors++;
    }

    return !errors;
  }
}
