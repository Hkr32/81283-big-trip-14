import dayjs from 'dayjs';
import { position } from './const.js';

export const dateDiff = (dateFrom, dateTo) => {
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;
  const DAY_ZERO_MIN = 1;
  const DAY_ZERO_MAX = 10;
  const HOUR_ZERO_MIN = 10;
  const HOUR_ZERO_MAX = 10;
  const MINUTE_ZERO_MAX = 10;

  const diff = dayjs(dateFrom).diff(dayjs(dateTo), 'minute');
  const d = Math.floor(diff / MINUTE_IN_DAY);
  const remainder = diff % MINUTE_IN_DAY;
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

export const dateFormat = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const dateToISO = (date) => {
  return dayjs(date).toISOString();
};

// Получение случайного целого числа
export const getRandomInteger = (min = 0, max = 1, coefficient = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (Math.floor(lower + Math.random() * (upper - lower + 1)) * coefficient);
};

// Создание элемента
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Рендер элемента
export const render = (container, element, place = position.BEFORE_END) => {
  switch (place) {
    case position.AFTER_BEGIN:
      container.prepend(element);
      break;
    case position.BEFORE_END:
      container.append(element);
      break;
  }
};
