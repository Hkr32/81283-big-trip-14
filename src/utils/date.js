import dayjs from 'dayjs';

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
  if (!date) return '';

  return dayjs(date).format(format);
};

export const dateToISO = (date) => {
  return dayjs(date).toISOString();
};
