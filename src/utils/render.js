import { position } from '../const.js';

// Создание элемента
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Рендер элемента
export const render = (container, element, place = position.BEFORE_END) => {
  switch (place) {
    case position.AFTER_BEGIN:
      container.prepend(element);
      break;
    case position.BEFORE_END:
      container.append(element);
      break;
  }
};
