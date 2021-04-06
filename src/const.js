// Количество точек на главной
export const POINT_COUNTER = 15;

// Перечисление возможных позиций добавляемого элемента относительно элемента
export const position = {
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_END: 'beforeend', // сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

//
export const eventTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const eventCities = [
  'Amsterdam',
  'Rotterdam',
  'The Hague',
  'Utrecht',
  'Eindhoven',
  'Groningen',
  'Tilburg',
];

export const eventOffers = [
  {
    name: 'luggage',
    title: 'Add luggage',
    price: 50,
  },
  {
    name: 'comfort',
    title: 'Switch to comfort class',
    price: 80,
  },
  {
    name: 'meal',
    title: 'Add meal',
    price: 15,
  },
  {
    name: 'seats',
    title: 'Choose seats',
    price: 5,
  },
  {
    name: 'train',
    title: 'Travel by train',
    price: 40,
  },
];

export const eventDestinations = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nisi enim doloribus? Maxime perferendis distinctio, consequatur, facere totam voluptatem est rem odio optio quod magnam non deleniti sit impedit accusamus.',
  'Earum exercitationem ullam dignissimos aliquam alias est natus accusantium quasi cupiditate saepe mollitia tempore sequi odio, dolores libero corporis molestiae non beatae et excepturi? Consequuntur, laboriosam voluptatem. Est, voluptatum aliquid?',
  'Culpa id eius ex ullam possimus eligendi? Quae ducimus quasi quaerat. Minus nam voluptatibus, repellat maxime eum quidem! Vitae voluptas, deleniti consectetur eum doloribus maiores dolorum! Placeat laudantium quibusdam alias.',
  'Pariatur nobis necessitatibus dolorem magnam asperiores eius praesentium iusto aut numquam dignissimos, repellat modi quis in quisquam sequi soluta commodi accusamus a iste! Explicabo repudiandae quos in excepturi incidunt porro.',
  'Ea, eligendi earum quaerat delectus consequuntur magnam tempore veritatis expedita esse porro possimus at nam dolores, minima cumque harum iure quae animi obcaecati nobis labore. Ex distinctio reiciendis repellendus sed.',
  'Tempore sapiente hic, animi, quo atque est ex neque distinctio cupiditate exercitationem minima fuga officiis tenetur, debitis quos consequatur eaque vel veritatis delectus? Obcaecati expedita, aut placeat illo fugit aperiam.',
  'Natus officiis nemo quibusdam, vero quo, aperiam vitae velit impedit odit exercitationem rem voluptates, fugiat nesciunt. Quae soluta illum nesciunt odio ex corporis recusandae. Reprehenderit nisi neque laboriosam nihil amet!',
];

export const eventPhotosUrl = 'http://picsum.photos/248/152?r=';
