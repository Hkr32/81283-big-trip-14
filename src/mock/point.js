import dayjs from 'dayjs';

import { getRandomInteger } from '../utils.js';
import { eventDestinations, eventOffers, eventTypes, eventCities, eventPhotosUrl } from '../const.js';

const generateDate = () => {
  const maxDaysGap = 2;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

// Случайное описание
const generateDestinations = () => {
  const randomIndex = getRandomInteger(0, eventDestinations.length - 1);

  return eventDestinations[randomIndex];
};

// Набор предложений
const generateOffers = () => {
  const randomIndex = getRandomInteger(0, eventOffers.length - 1);

  return eventOffers.slice(randomIndex, eventOffers.length - 1);
};

// Тип
const generateType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

// Город
const generateCity = () => {
  const randomIndex = getRandomInteger(0, eventCities.length - 1);

  return eventCities[randomIndex];
};

// Фото
const generatePhotos = () => {
  const randomCounter = getRandomInteger(1, 5);

  const photos = [];

  for (let i = 0; i < randomCounter; i++) {
    photos.push(eventPhotosUrl + getRandomInteger(10, 100));
  }

  return photos;
};

// Генератор точки
export const generatePoint = () => {
  return {
    type: generateType(),
    city: generateCity(),
    offers: generateOffers(),
    destination: generateDestinations(),
    photos: generatePhotos(),
    basePrice: getRandomInteger(10, 20, 10),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
