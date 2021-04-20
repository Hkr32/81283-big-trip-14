import AbstractView from './abstract.js';

const createSitePointListEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class SitePointList extends AbstractView {
  getTemplate() {
    return createSitePointListEmptyTemplate();
  }
}
