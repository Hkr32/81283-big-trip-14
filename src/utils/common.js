import { KeyType } from './const.js';

// Получение случайного целого числа
export const getRandomInteger = (min = 0, max = 1, coefficient = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (Math.floor(lower + Math.random() * (upper - lower + 1)) * coefficient);
};

export const isEscKey = (keyType) => {
  return (keyType === KeyType.ESCAPE || keyType === KeyType.ESC);
};
