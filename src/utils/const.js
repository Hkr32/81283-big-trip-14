// Перечисление возможных позиций добавляемого элемента относительно элемента
export const Position = {
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_END: 'beforeend', // сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

// Элементы меню
export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  TABLE: 'TABLE',
  STATISTICS: 'STATISTICS',
};

// Типы сортировки
export const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

// Типы фильтров
export const FilterType = {
  EVERYTHING: 'filter-everything',
  FUTURE: 'filter-future',
  PAST: 'filter-past',
};

// Соответствие типов
export const Type = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  TRANSPORT: 'transport',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

// Типы путешествий
export const TYPES = [
  Type.TAXI,
  Type.BUS,
  Type.TRAIN,
  Type.SHIP,
  Type.TRANSPORT,
  Type.DRIVE,
  Type.FLIGHT,
  Type.CHECK_IN,
  Type.SIGHTSEEING,
  Type.RESTAURANT,
];

// Дефолтный объект
export const DEFAULT_POINT = {
  type: Type.TAXI,
  offers: [],
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
};

// Действия пользователя
export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

// Типы обновлений
export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
