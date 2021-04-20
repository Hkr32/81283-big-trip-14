import AbstractView from './abstract.js';

const createSiteHeaderInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class SiteHeaderInfo extends AbstractView {
  getTemplate() {
    return createSiteHeaderInfoTemplate();
  }
}
