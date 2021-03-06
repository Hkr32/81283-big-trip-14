import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';

import { isEscKey, isOnline } from '../utils/common.js';
import { render, replace, remove } from '../utils/render.js';
import { UserAction, UpdateType } from '../utils/const.js';
import { validatePoint, setAborting } from '../utils/point.js';
import { toast } from '../utils/toast.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Point {
  constructor(container, changeData, changeMode, pointsModel) {
    this._pointsModel = pointsModel;

    this._pointListContainer = container;
    this._tripPoint = null;
    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._editCloseClickHandler = this._editCloseClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._tripPoint = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(this._tripPoint);
    this._pointEditComponent = new PointEditView(this._pointsModel.getDestinations(), this._pointsModel.getOffers(), this._tripPoint);

    this._pointComponent.setEditClickHandler(this._editClickHandler);
    this._pointComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditComponent.setEditClickHandler(this._editCloseClickHandler);
    this._pointEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._tripPoint);
      this._replaceFormToPoint();
    }
  }

  _editClickHandler() {
    if (!isOnline()) {
      toast('You can\'t edit task offline');

      return;
    }
    this._replacePointToForm();
  }

  _favoriteClickHandler() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._tripPoint,
        {
          isFavorite: !this._tripPoint.isFavorite,
        },
      ),
    );
  }

  _editCloseClickHandler() {
    this._pointEditComponent.reset(this._tripPoint);
    this._replaceFormToPoint();
  }

  _formSubmitHandler(update) {
    if (!isOnline()) {
      toast('You can\'t save task offline');
      setAborting(this._pointEditComponent);

      return;
    }

    if (validatePoint(update)) {
      this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update,
      );
      document.removeEventListener('keydown', this._escKeyDownHandler);
    } else {
      setAborting(this._pointEditComponent);
    }

  }

  _deleteClickHandler(point) {
    if (!isOnline()) {
      toast('You can\'t delete point offline');
      setAborting(this._pointEditComponent);

      return;
    }

    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
}
