import { KeyType } from './const.js';

// Получение случайного целого числа
export const getRandomInteger = (min = 0, max = 1, coefficient = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (Math.floor(lower + Math.random() * (upper - lower + 1)) * coefficient);
};

// Проверка нажата ли клавиша esc
export const isEscKey = (keyType) => {
  return (keyType === KeyType.ESCAPE || keyType === KeyType.ESC);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
