// Количество точек на главной
export const COUNTER = 3;

// Перечисление возможных позиций добавляемого элемента относительно элемента
export const position = {
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_END: 'beforeend', // сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};
