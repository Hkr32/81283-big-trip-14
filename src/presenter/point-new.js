import PointEditView from '../view/point-edit.js';

import { remove, render } from '../utils/render.js';
import { UserAction, UpdateType, Position } from '../utils/const.js';
import { isEscKey, isOnline } from '../utils/common.js';
import { validatePoint, setAborting } from '../utils/point.js';
import { toast } from '../utils/toast.js';

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

    render(this._pointListContainer, this._pointEditComponent, Position.AFTER_BEGIN);

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

  _handleDeleteClick() {
    this.destroy();
  }

  _handleFormSubmit(point) {
    if (!isOnline()) {
      toast('You can\'t save task offline');
      setAborting(this._pointEditComponent);

      return;
    }

    if (validatePoint(point)) {
      this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point,
      );
    } else {
      setAborting(this._pointEditComponent);
    }
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
