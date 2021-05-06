import AbstractView from '../abstract.js';

const createHeaderInfoTemplate = () => {
  return '<section class="trip-main__trip-info  trip-info"></section>';
};

export default class HeaderInfo extends AbstractView {
  getTemplate() {
    return createHeaderInfoTemplate();
  }
}
