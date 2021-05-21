
import { dateDiffInMinutes } from '../utils/date.js';

// Высота элемента
export const BAR_HEIGHT = 55;

// Типы диаграмм
export const DiagramType = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPEND',
};

// Сортировка по деньгам
export const sortMoneyDown = (one, second) => {
  return second[1].money - one[1].money;
};

// Сортировка по количеству использования
export const sortCountDown = (one, second) => {
  return second[1].count - one[1].count;
};

// Сортировка по продолжительности
export const sortDurationDown = (one, second) => {
  return second[1].duration - one[1].duration;
};

// Расчет массива для построения диаграммы
export const calcStatistics = (points) => {
  const calc = new Map();
  points.map(({ type, basePrice, dateFrom, dateTo }) => {
    const typeValue = calc.get(type);
    if (!typeValue) {
      calc.set(type, {
        money: basePrice,
        count: 1,
        duration: (dateDiffInMinutes(dateFrom, dateTo)),
      });
    } else {
      typeValue.money += +basePrice;
      typeValue.count += +1;
      typeValue.duration += +(dateDiffInMinutes(dateFrom, dateTo));
    }
  });

  return Array.from(calc.entries());
};
