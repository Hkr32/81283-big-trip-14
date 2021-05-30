// Для хранилища

const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v14';

// Имя для хранилища
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

// Префиксы для хранилища данных
export const DataPostfix = {
  POINTS: '_points',
  OFFERS: '_offers',
  DESTINATIONS: '_destinations',
};

// Идентификаторы для хранилища данных
export const DataIds = {
  POINTS: 'id',
  OFFERS: 'type',
  DESTINATIONS: 'name',
};
