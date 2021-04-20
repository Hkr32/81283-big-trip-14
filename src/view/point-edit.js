import AbstractView from './abstract.js';
import { dateFormat } from '../utils/date.js';
import { types } from '../const.js';

const createSitePointTypesTemplate = (types) => {
  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.reduce((str, type) => `${str}
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`, '')}
    </fieldset>
  </div>`;
};

const createSitePointCitiesTemplate = (cities) => {
  return `<datalist id="destination-list-1">
    ${cities.reduce((str, city) => `${str}
    <div class="event__type-item">
      <option value="${city}"></option>
    </div>`, '')}
  </datalist>`;
};

const createSitePointOffersTemplate = (offers) => {
  return `<div class="event__available-offers">
    ${offers.reduce((str, { name, title, price }) => `${str}
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${offers.includes(name) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`, '')}
  </div>`;
};

const createSitePointPhotosTemplate = (photos) => {
  return `<div class="event__photos-tape">
    ${photos.reduce((str, photo) => `${str}
    <img class="event__photo" src="${photo.src}" alt="${photo.description}">`, '')}
  </div>`;
};

const createSitePointEditTemplate = (destinationsExternal, offersExternal, point) => {
  const {
    type = '',
    offers = [],
    destination: {
      description: description = '',
      name: city = '',
      pictures: pictures = [],
    } = {},
    basePrice = '',
    dateFrom = '',
    dateTo = '',
  } = point;

  const iconSrc = type ? ('img/icons/' + type.toLowerCase() + '.png') : '';
  const iconAlt = type ? 'Event type icon' : '';

  const cities = destinationsExternal.map((dest) => dest.name);

  const typesTemplate = createSitePointTypesTemplate(types);
  const citiesTemplate = createSitePointCitiesTemplate(cities);
  const offersTemplate = createSitePointOffersTemplate(offers);
  const photosTemplate = createSitePointPhotosTemplate(pictures);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${iconSrc}" alt="${iconAlt}">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${typesTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          ${citiesTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFormat(dateFrom, 'YY/MM/DD HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateFormat(dateTo, 'YY/MM/DD HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${offersTemplate}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            ${photosTemplate}
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class SitePointEdit extends AbstractView {
  constructor(destinations, offers, point) {
    super();
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  getTemplate() {
    return createSitePointEditTemplate(this._destinations, this._offers, this._point);
  }
}
