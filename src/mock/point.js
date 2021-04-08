import dayjs from 'dayjs';

import { getRandomInteger } from '../utils.js';
import { destinations, offers } from './const.js';
import { types } from '../const.js';

// Случайная дата
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

// Случайный вариант назначения
const generateDestination = () => {
  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

// Предложение по его типу
const getOffers = (offers, type) => {
  const offerByType = offers.filter((offer) => {
    return offer.type === type;
  });

  return offerByType[0].offers;
};

// Тип
const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

// Генератор точки
export const generatePoint = () => {
  const type = generateType();
  const {
    name: city = '',
    description: destination = '',
    pictures: photos = [],
  } = generateDestination();

  return {
    type: type,
    city: city,
    offers: getOffers(offers, type),
    destination: destination,
    photos: photos,
    basePrice: getRandomInteger(10, 20, 10),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
