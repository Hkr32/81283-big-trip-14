import { dateDiffInMinutes, isSameOrAfterDate, isSameOrBeforeDate } from '../utils/date.js';

const compareNumeric = (onePrice, secondPrice) => {
  return onePrice - secondPrice;
};

export const filterPointsFuture = (points) => {
  return points.filter((point) => {
    return isSameOrAfterDate(point.dateFrom);
  });
};

export const filterPointsPast = (points) => {
  return points.filter((point) => {
    return isSameOrBeforeDate(point.dateFrom);
  });
};

export const sortPointTime = (pointOne, pointSecond) => {
  return dateDiffInMinutes(pointOne.dateFrom, pointOne.dateTo) - dateDiffInMinutes(pointSecond.dateFrom, pointSecond.dateTo);
};

export const sortPointPrice = (pointOne, pointSecond) => {
  return compareNumeric(pointOne.basePrice, pointSecond.basePrice);
};

export const getOfferId = (value) => value.replace(/\s+/g, '-').trim().toLowerCase();
