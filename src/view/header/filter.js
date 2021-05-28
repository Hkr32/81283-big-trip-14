import AbstractView from '../abstract.js';
import { FilterType } from '../../utils/const.js';

const createHeaderFilterTemplate = (currentFilterType, isDisableFuture, isDisablePast) => {
  return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything" data-filter-type="${FilterType.EVERYTHING}">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? 'checked' : ''} ${isDisableFuture ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future" data-filter-type="${FilterType.FUTURE}">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? 'checked' : ''} ${isDisablePast ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-past" data-filter-type="${FilterType.PAST}">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class HeaderFilter extends AbstractView {
  constructor(currentFilterType, isDisableFuture, isDisablePast) {
    super();

    this._currentFilterType = currentFilterType;
    this._isDisableFuture = isDisableFuture;
    this._isDisablePast = isDisablePast;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createHeaderFilterTemplate(this._currentFilterType, this._isDisableFuture, this._isDisablePast);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL' || (this._isDisableFuture && evt.target.dataset.filterType === FilterType.FUTURE) || (this._isDisablePast && evt.target.dataset.filterType === FilterType.PAST)) {
      return;
    }

    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  setDisabledStatus(isDisabled) {
    const filters = this.getElement().querySelectorAll('.trip-filters input.trip-filters__filter-input');
    filters.forEach((filter) => {
      filter.disabled = isDisabled;

      if (isDisabled) {
        filter.removeEventListener('click', this._filterTypeChangeHandler);
      } else {
        filter.addEventListener('click', this._filterTypeChangeHandler);
      }
    });
  }
}
