import { dateDiffInMinutes, dateInFuture, dateInPast } from '../utils/date.js';
import { toast } from '../utils/toast.js';

const compareNumeric = (onePrice, secondPrice) => {
  return onePrice - secondPrice;
};

export const filterPointsFuture = (points) => {
  return points.filter((point) => {
    return dateInFuture(point.dateFrom, point.dateTo);
  });
};

export const filterPointsPast = (points) => {
  return points.filter((point) => {
    return dateInPast(point.dateFrom, point.dateTo);
  });
};

export const sortPointDate = (pointOne, pointSecond) => {
  return pointOne.dateFrom - pointSecond.dateFrom;
};

export const sortPointTime = (pointOne, pointSecond) => {
  return dateDiffInMinutes(pointSecond.dateFrom, pointSecond.dateTo) - dateDiffInMinutes(pointOne.dateFrom, pointOne.dateTo);
};

export const sortPointPrice = (pointOne, pointSecond) => {
  return compareNumeric(pointSecond.basePrice, pointOne.basePrice);
};

export const getOfferId = (value) => value.replace(/\s+/g, '-').trim().toLowerCase();

export const validatePoint = (point) => {
  const TOAST_TIME = 10000;
  let errors = 0;
  if (!point.destination.name) {
    errors++;
    toast('City is required!', TOAST_TIME);
  }
  if (!point.dateFrom) {
    errors++;
    toast('Date from is required!', TOAST_TIME);
  }
  if (!point.dateTo) {
    errors++;
    toast('Date to is required!', TOAST_TIME);
  }
  if (point.basePrice < 1) {
    errors++;
    toast('Price is required and above zero!', TOAST_TIME);
  }

  return !errors;
};

export const setAborting = (component) => {
  const resetFormState = () => {
    component.updateData({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  component.shake(resetFormState);
};
