import { dateDiffInMinutes } from '../utils/date.js';

const compareNumeric = (onePrice, secondPrice) => {
  return onePrice - secondPrice;
};

export const sortPointTime = (pointOne, pointSecond) => {
  return dateDiffInMinutes(pointOne.dateFrom, pointOne.dateTo) - dateDiffInMinutes(pointSecond.dateFrom, pointSecond.dateTo);
};

export const sortPointPrice = (pointOne, pointSecond) => {
  return compareNumeric(pointOne.basePrice, pointSecond.basePrice);
};
