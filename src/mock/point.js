import dayjs from 'dayjs';

import { getRandomInteger } from '../utils/common.js';
import { destinations, offers } from './const.js';
import { types } from '../utils/const.js';

let counter = -7;

// Дата
const generateConsistentlyDate = (date = dayjs()) => {
  counter++;

  return dayjs(date).add(counter, 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute').toDate();
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
  // const {
  //   name: city = '',
  //   description: destination = '',
  //   pictures: photos = [],
  // } = generateDestination();

  const from = generateConsistentlyDate();

  return {
    type: type,
    offers: getOffers(offers, type),
    destination: generateDestination(),
    basePrice: getRandomInteger(10, 20, 10),
    dateFrom: from,
    dateTo: generateConsistentlyDate(from),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
