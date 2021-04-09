import dayjs from 'dayjs';

export const dateDiff = (dateFrom, dateTo) => {
  const diff = dayjs(dateFrom).diff(dayjs(dateTo), 'minute');
  const d = Math.floor(diff / 1440);
  const remainder = diff % 1440;
  const h = Math.floor(remainder / 60);
  const m = Math.floor(remainder % 60);

  let diffStr = '';

  if (d >= 1) {
    diffStr += (d >= 10 ? d : ('0' + d)) + 'D ';
  }
  if (d >= 1 || h >= 1) {
    diffStr += (h >= 10 ? h : ('0' + h)) + 'H ';
  }
  diffStr += (m >= 10 ? m : ('0' + m)) + 'M ';

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
