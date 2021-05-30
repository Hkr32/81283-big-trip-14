import Observer from '../utils/observer.js';
import { FilterType } from '../utils/const.js';
import { formatDate } from '../utils/date.js';

const Length = {
  ONE: 1,
  TWO: 2,
  TREE: 3,
};

export default class Header extends Observer {
  constructor() {
    super();

    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

  getSumTrip(points) {
    return points.reduce((sum, point) => {
      return sum + Number(point.basePrice) + point.offers.reduce((sumOffers, offer) => sumOffers + Number(offer.price), 0);
    }, 0);
  }

  generateTrip(points) {
    let title = '';
    let date = '';
    const lengthPoints = points.length;
    if (lengthPoints === 0) {
      return { title, date };
    }

    const [first, second, third] = points;
    const lastPoint = lengthPoints - 1;

    switch (lengthPoints) {
      case Length.ONE:
        title = first.destination.name;
        break;
      case Length.TWO:
        title = [first.destination.name, second.destination.name].join(' &mdash; ');
        break;
      case Length.TREE:
        title = [first.destination.name, second.destination.name, third.destination.name].join(' &mdash; ');
        break;
      default:
        title = `${first.destination.name} &mdash; ... &mdash; ${points[lastPoint].destination.name}`;
        break;
    }

    date = lengthPoints === Length.ONE
      ? formatDate(first.dateFrom, 'D MMM')
      : `${formatDate(first.dateFrom, 'D MMM')}&nbsp;&mdash;&nbsp; ${formatDate(points[lastPoint].dateTo, 'D MMM')}`;

    return { title, date };
  }
}
