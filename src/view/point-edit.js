import { dateFormat } from '../utils.js';
import { types, defaultType } from '../const.js';

const createSitePointTypesTemplate = (types) => {
  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map((type) => `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`).join('')}
    </fieldset>
  </div>`;
};

const createSitePointCitiesTemplate = (cities) => {
  return `<datalist id="destination-list-1">
    ${cities.map((city) => `<div class="event__type-item">
      <option value="${city}"></option>
    </div>`).join('')}
  </datalist>`;
};

const createSitePointOffersTemplate = (offers) => {
  return `<div class="event__available-offers">
    ${offers.map(({ name, title, price }) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${offers.includes(name) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('')}
  </div>`;
};

const createSitePointPhotosTemplate = (photos) => {
  return `<div class="event__photos-tape">
    ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  </div>`;
};

const getOffersByType = (offers, type) => {
  const offer = offers.filter((offer) => {
    return offer.type === type;
  });

  return offer[0].offers;
};
const getDestinationByCity = (destinations, city) => {
  const destination = destinations.filter((destination) => {
    return destination.name === city;
  });

  return destination[0];
};

export const createSitePointEditTemplate = (destinationsExternal, offersExternal, point = {}) => {
  // const {
  //   type = '',
  //   offers = [],
  //   destination: {
  //     description: description = '',
  //     name: city = '',
  //     pictures: photos = [],
  //   } = {},
  //   basePrice = '',
  //   dateFrom = '',
  //   dateTo = '',
  //   isFavorite = false,
  // } = point;

  // Тестовые данные
  const dest = getDestinationByCity(destinationsExternal, 'Utrecht');
  const {
    type = defaultType,
    offers = getOffersByType(offersExternal, defaultType),
    destination: {
      description: description = dest.description,
      name: city = dest.name,
      pictures: pictures = dest.pictures,
    } = {},
    basePrice = 100,
    dateFrom = '2021-04-01T09:00',
    dateTo = '2021-04-02T15:10',
    isFavorite = false,
  } = point;

  const previewTypeIcon = {
    src: type ? ('img/icons/' + type.toLowerCase() + '.png') : '',
    alt: type ? 'Event type icon' : '',
  };

  const cities = destinationsExternal.map((dest) => {
    return dest.name;
  });

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
            <img class="event__type-icon" width="17" height="17" src="${previewTypeIcon.src}" alt="${previewTypeIcon.alt}">
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? dateFormat(dateFrom, 'YY/MM/DD HH:mm') : ''}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? dateFormat(dateTo, 'YY/MM/DD HH:mm') : ''}">
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