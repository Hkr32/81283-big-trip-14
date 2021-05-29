import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

// Формат дат для отображения и вывода
export const DateFormatStr = {
  HUMAN: 'y/m/d H:i',
  ALT: 'd/m/y H:i',
  FULL: 'YY/MM/DD HH:mm',
  DEFAULT: 'YYYY-MM-DD',
};

// Возвращает начало текущего дня
export const startOfDate = (start = 'day') => {
  return dayjs().startOf(start).toDate();
};

// Возвращает конец текущего дня
export const endOfDate = (end = 'day') => {
  return dayjs().endOf(end).toDate();
};

// Приведение минут к строке
export const dateToDurationString = (minutes) => {
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;
  const ZERO_MIN = 1;
  const ZERO_MAX = 10;

  const d = Math.floor(minutes / MINUTE_IN_DAY);
  const remainder = minutes % MINUTE_IN_DAY;
  const h = Math.floor(remainder / MINUTE_IN_HOUR);
  const m = Math.floor(remainder % MINUTE_IN_HOUR);

  let diffStr = '';

  if (d >= ZERO_MIN) {
    diffStr += (d >= ZERO_MAX ? d : ('0' + d)) + 'D ';
  }
  if (d >= ZERO_MIN || h >= ZERO_MIN) {
    diffStr += (h >= ZERO_MAX ? h : ('0' + h)) + 'H ';
  }
  diffStr += (m >= ZERO_MAX ? m : ('0' + m)) + 'M';

  return diffStr;
};

// Получение разницы дат в минутах
export const dateDiffInMinutes = (dateFrom, dateTo) => {
  return dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
};

// Проверяет даты из интервала точки, что они еще НЕ завершены
export const dateInFuture = (dateFrom, dateTo, date = dayjs()) => {
  return dayjs(dateFrom).isSameOrAfter(date) || dayjs(dateTo).isSameOrAfter(date);
};

// Проверяет даты из интервала точки, что они УЖЕ завершены
export const dateInPast = (dateFrom, dateTo, date = dayjs()) => {
  return dayjs(dateTo).isSameOrBefore(date) || dayjs(dateFrom).isSameOrBefore(date);
};

// Получение разницы дат
export const dateDiffStr = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  return dateToDurationString(diffInMinutes);
};

// Форматирование даты
export const dateFormat = (date, format = DateFormatStr.DEFAULT) => {
  if (!date) return '';

  return dayjs(date).format(format);
};

// Приведение даты к формату ISO
export const dateToISO = (date) => {
  if (!date) return null;

  return dayjs(date).toISOString();
};
