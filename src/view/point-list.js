import AbstractView from './abstract.js';

const createSitePointListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class SitePointList extends AbstractView {
  getTemplate() {
    return createSitePointListTemplate();
  }
}
