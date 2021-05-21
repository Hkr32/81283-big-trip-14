import dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const duration = require('dayjs/plugin/duration');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

// Приведение минут к строке
export const dateToDurationString = (minutes) => {
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;
  const DAY_ZERO_MIN = 1;
  const DAY_ZERO_MAX = 10;
  const HOUR_ZERO_MIN = 1;
  const HOUR_ZERO_MAX = 10;
  const MINUTE_ZERO_MAX = 10;

  const d = Math.floor(minutes / MINUTE_IN_DAY);
  const remainder = minutes % MINUTE_IN_DAY;
  const h = Math.floor(remainder / MINUTE_IN_HOUR);
  const m = Math.floor(remainder % MINUTE_IN_HOUR);

  let diffStr = '';

  if (d >= DAY_ZERO_MIN) {
    diffStr += (d >= DAY_ZERO_MAX ? d : ('0' + d)) + 'D ';
  }
  if (d >= DAY_ZERO_MIN || h >= HOUR_ZERO_MIN) {
    diffStr += (h >= HOUR_ZERO_MAX ? h : ('0' + h)) + 'H ';
  }
  diffStr += (m >= MINUTE_ZERO_MAX ? m : ('0' + m)) + 'M ';

  return diffStr;
};

// Получен6ие разницы дат в минутах
export const dateDiffInMinutes = (dateFrom, dateTo) => {
  return dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
};

// Проверяет совпадает ли дата или она после
export const isSameOrAfterDate = (date) => {
  return dayjs(date).isSameOrAfter(dayjs());
};

// Проверяет совпадает ли дата или она раньше
export const isSameOrBeforeDate = (date) => {
  return dayjs(date).isSameOrBefore(dayjs());
};

// Получение разницы дат
export const dateDiffStr = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  return dateToDurationString(diffInMinutes);
};

// Форматирование даты
export const dateFormat = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';

  return dayjs(date).format(format);
};

// Приведение даты к формату ISO
export const dateToISO = (date) => {
  return dayjs(date).toISOString();
};
