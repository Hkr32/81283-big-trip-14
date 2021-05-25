
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import SmartView from './smart.js';

import { dateFormat } from '../utils/date.js';
import { Type, types, defaultPoint } from '../utils/const.js';
import { getOfferId } from '../utils/point.js';

const createTypesTemplate = (types, currentType) => {
  return types.reduce((str, type) => {
    const isChecked = type === currentType;

    str += `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;

    return str;
  }, '');
};

const createPointTypesTemplate = (types, currentType) => {
  const typesTemplate = createTypesTemplate(types, currentType);

  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${typesTemplate}
    </fieldset>
  </div>`;
};

const createCitiesTemplate = (cities, currentCity) => {
  return cities.reduce((str, city) => {
    const isChecked = cities.some((city) => {
      return city === currentCity;
    });

    str += `<div class="event__type-item">
        <option value="${city}" ${isChecked ? 'checked' : ''}>${city}</option>
      </div>`;

    return str;
  }, '');
};

const createPointCitiesTemplate = (cities, currentCity = '') => {
  const citiesTemplate = createCitiesTemplate(cities, currentCity);

  return `<datalist id="destination-list-1">${citiesTemplate}</datalist>`;
};

const createOffersTemplate = (offers, offersExternal, isDisabled) => {
  return offersExternal.reduce((str, offer) => {
    const offerId = getOfferId(offer.title);
    const isChecked = offers.some(({ title }) => {
      return getOfferId(title) === offerId;
    });

    str += `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}" type="checkbox" value="${offerId}" name="event-offers[]" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offerId}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;

    return str;
  }, '');
};

const createPointOffersTemplate = (offers = [], offersExternal = [], isDisabled = false) => {
  if (!offersExternal.length) {
    return '';
  }
  const offersTemplate = createOffersTemplate(offers, offersExternal, isDisabled);

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${offersTemplate}</div>
  </section>`;
};

const createPointDestinationsTemplate = (description, pictures) => {
  if (description === '' || description === undefined) {
    return '';
  }
  const photosTemplate = createPointPhotosTemplate(pictures);

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      ${photosTemplate}
    </div>
  </section>`;
};

const createPointPhotosTemplate = (photos) => {
  return `<div class="event__photos-tape">
    ${photos.reduce((str, photo) => `${str}
    <img class="event__photo" src="${photo.src}" alt="${photo.description}">`, '')}
  </div>`;
};

const createRollUpBtnTemplate = (isCreate) => {
  if (isCreate) {
    return '';
  }

  return `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
};

const createPointEditTemplate = (destinationsExternal, offersExternal, data = {}, isCreate = false) => {
  const {
    type = Type.TAXI,
    offers = [],
    destination: {
      description: description = '',
      name: city = '',
      pictures: pictures = [],
    } = {},
    basePrice = 0,
    dateFrom = null,
    dateTo = null,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const iconSrc = type ? ('img/icons/' + type.toLowerCase() + '.png') : '';
  const iconAlt = type ? 'Event type icon' : '';

  const cities = destinationsExternal.map((dest) => dest.name);

  const offersExternalByType = offersExternal.find((offer) => {
    return offer.type === type;
  });

  const typesTemplate = createPointTypesTemplate(types, type);
  const citiesTemplate = createPointCitiesTemplate(cities, city);
  const offersTemplate = createPointOffersTemplate(offers, offersExternalByType !== undefined ? offersExternalByType.offers : [], isDisabled);
  const destinationsTemplate = createPointDestinationsTemplate(description, pictures);
  const rollUpBtnTemplate = createRollUpBtnTemplate(isCreate);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${iconSrc}" alt="${iconAlt}">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          ${typesTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          ${citiesTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFormat(dateFrom, 'YY/MM/DD HH:mm')}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateFormat(dateTo, 'YY/MM/DD HH:mm')}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isCreate ? 'Cancel' : isDeleting ? 'Deleting...' : 'Delete'}</button>
        ${rollUpBtnTemplate}
      </header>
      <section class="event__details">
        ${offersTemplate}
        ${destinationsTemplate}
      </section>
    </form>
  </li>`;
};

export default class PointEdit extends SmartView {
  constructor(destinations, offers, point) {
    super();

    this._data = PointEdit.parsePointToData(point || defaultPoint);
    this._isCreate = point ? false : true;
    this._datePickerStart = null;
    this._datePickerEnd = null;
    this._destinations = destinations;
    this._offers = offers;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changeOfferHandler = this._changeOfferHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDateInputHandler = this._startDateInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateInputHandler = this._endDateInputHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._startDateInputHandler();
    this._endDateInputHandler();
  }

  _startDateInputHandler() {
    if (this._datePickerStart) {
      this._datePickerStart.destroy();
      this._datePickerStart = null;
    }

    this._datePickerStart = flatpickr(
      this.getElement().querySelector('.event__input--time[name=event-start-time]'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'y/m/d H:i',
        defaultDate: this._data.dateFrom,
        maxDate: this._data.dateFrom,
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _endDateInputHandler() {
    if (this._datePickerEnd) {
      this._datePickerEnd.destroy();
      this._datePickerEnd = null;
    }

    this._datePickerEnd = flatpickr(
      this.getElement().querySelector('.event__input--time[name=event-end-time]'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'y/m/d H:i',
        defaultDate: this._data.dateTo,
        minDate: this._data.dateTo,
        onChange: this._endDateChangeHandler,
      },
    );
  }

  _startDateChangeHandler([dateFrom]) {
    this.updateData({ dateFrom }, true);
    this._datePickerEnd.set('minDate', dateFrom);
  }

  _endDateChangeHandler([dateTo]) {
    this.updateData({ dateTo }, true);
    this._datePickerStart.set('maxDate', dateTo);
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    const destination = this._destinations.find(({ name }) => {
      return name === evt.target.value;
    });
    if (!destination) {
      return;
    }
    this.updateData({ destination });
  }

  _changeOfferHandler(evt) {
    const offerValue = evt.target.value;
    const isExist = this._data.offers.some(({ title }) => {
      return getOfferId(title) === offerValue;
    });

    if (!isExist) {
      const currentOffer = this._offers.find((offerExternal) => {
        return offerExternal.type === this._data.type;
      });
      const selectedOffer = currentOffer.offers.find(({ title }) => {
        return getOfferId(title) === offerValue;
      });
      if (selectedOffer) {
        this._data.offers.push(selectedOffer);
      }
    } else {
      this._data.offers = this._data.offers.filter(({ title }) => {
        return getOfferId(title) !== offerValue;
      });
    }
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: Number(evt.target.value),
    }, true);
  }

  _setInnerHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    if (!this._isCreate) {
      this.setEditClickHandler(this._callback.editClick);
    }
    this.setChangePriceHandler();
    this.setChangeTypeHandler();
    this.setChangeDestinationHandler();
    this.setChangeOffersHandler();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._startDateInputHandler();
    this._endDateInputHandler();
  }

  setChangePriceHandler() {
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._priceInputHandler);
  }

  setChangeTypeHandler() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._changeTypeHandler);
  }

  setChangeDestinationHandler() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationHandler);
  }

  setChangeOffersHandler() {
    const offers = this.getElement().querySelectorAll('.event__available-offers input.event__offer-checkbox');
    offers.forEach((offer) => {
      offer.addEventListener('change', this._changeOfferHandler);
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datePickerStart) {
      this._datePickerStart.destroy();
      this._datePickerStart = null;
    }
    if (this._datePickerEnd) {
      this._datePickerEnd.destroy();
      this._datePickerEnd = null;
    }
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._destinations, this._offers, this._data, this._isCreate);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
