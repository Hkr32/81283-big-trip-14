// Типы кнопок
export const KeyType = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

// Проверка нажата ли клавиша esc
export const isEscKey = (keyType) => {
  return (keyType === KeyType.ESCAPE || keyType === KeyType.ESC);
};

// Проверка статуса (онлайн/оффлайн)
export const isOnline = () => {
  return window.navigator.onLine;
};
