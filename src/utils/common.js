// Типы кнопок
export const KeyType = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

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

// Проверка статуса (онлайн/оффлайн)
export const isOnline = () => {
  return window.navigator.onLine;
};
