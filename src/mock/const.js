import { Type } from '../const.js';

// Destinations mock
export const destinations = [
  {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nisi enim doloribus? Maxime perferendis distinctio, consequatur, facere totam voluptatem est rem odio optio quod magnam non deleniti sit impedit accusamus.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=1',
        description: 'Pict 1',
      },
      {
        src: 'http://picsum.photos/248/152?r=2',
        description: 'Pict 2',
      },
      {
        src: 'http://picsum.photos/248/152?r=3',
        description: 'Pict 3',
      },
    ],
  },
  {
    description: 'Earum exercitationem ullam dignissimos aliquam alias est natus accusantium quasi cupiditate saepe mollitia tempore sequi odio, dolores libero corporis molestiae non beatae et excepturi? Consequuntur, laboriosam voluptatem. Est, voluptatum aliquid?',
    name: 'Rotterdam',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=4',
        description: 'Pict 4',
      },
      {
        src: 'http://picsum.photos/248/152?r=5',
        description: 'Pict 5',
      },
      {
        src: 'http://picsum.photos/248/152?r=6',
        description: 'Pict 6',
      },
      {
        src: 'http://picsum.photos/248/152?r=7',
        description: 'Pict 7',
      },
    ],
  },
  {
    description: 'Culpa id eius ex ullam possimus eligendi? Quae ducimus quasi quaerat. Minus nam voluptatibus, repellat maxime eum quidem! Vitae voluptas, deleniti consectetur eum doloribus maiores dolorum! Placeat laudantium quibusdam alias.',
    name: 'The Hague',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=8',
        description: 'Pict 8',
      },
      {
        src: 'http://picsum.photos/248/152?r=9',
        description: 'Pict 9',
      },
      {
        src: 'http://picsum.photos/248/152?r=10',
        description: 'Pict 10',
      },
      {
        src: 'http://picsum.photos/248/152?r=11',
        description: 'Pict 11',
      },
      {
        src: 'http://picsum.photos/248/152?r=12',
        description: 'Pict 12',
      },
    ],
  },
  {
    description: 'Pariatur nobis necessitatibus dolorem magnam asperiores eius praesentium iusto aut numquam dignissimos, repellat modi quis in quisquam sequi soluta commodi accusamus a iste! Explicabo repudiandae quos in excepturi incidunt porro.',
    name: 'Utrecht',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=13',
        description: 'Pict 13',
      },
      {
        src: 'http://picsum.photos/248/152?r=14',
        description: 'Pict 14',
      },
      {
        src: 'http://picsum.photos/248/152?r=15',
        description: 'Pict 15',
      },
    ],
  },
  {
    description: 'Ea, eligendi earum quaerat delectus consequuntur magnam tempore veritatis expedita esse porro possimus at nam dolores, minima cumque harum iure quae animi obcaecati nobis labore. Ex distinctio reiciendis repellendus sed.',
    name: 'Eindhoven',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=16',
        description: 'Pict 16',
      },
      {
        src: 'http://picsum.photos/248/152?r=17',
        description: 'Pict 17',
      },
    ],
  },
  {
    description: 'Tempore sapiente hic, animi, quo atque est ex neque distinctio cupiditate exercitationem minima fuga officiis tenetur, debitis quos consequatur eaque vel veritatis delectus? Obcaecati expedita, aut placeat illo fugit aperiam.',
    name: 'Groningen',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=18',
        description: 'Pict 18',
      },
      {
        src: 'http://picsum.photos/248/152?r=19',
        description: 'Pict 19',
      },
    ],
  },
  {
    description: 'Natus officiis nemo quibusdam, vero quo, aperiam vitae velit impedit odit exercitationem rem voluptates, fugiat nesciunt. Quae soluta illum nesciunt odio ex corporis recusandae. Reprehenderit nisi neque laboriosam nihil amet!',
    name: 'Tilburg',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=20',
        description: 'Pict 20',
      },
      {
        src: 'http://picsum.photos/248/152?r=21',
        description: 'Pict 21',
      },
      {
        src: 'http://picsum.photos/248/152?r=22',
        description: 'Pict 22',
      },
      {
        src: 'http://picsum.photos/248/152?r=23',
        description: 'Pict 23',
      },
      {
        src: 'http://picsum.photos/248/152?r=24',
        description: 'Pict 24',
      },
    ],
  },
];

// Offers mock
export const offers = [
  {
    type: Type.TAXI,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
      {
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
  {
    type: Type.BUS,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: Type.TRAIN,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: Type.SHIP,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
    ],
  },
  {
    type: Type.TRANSPORT,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: Type.DRIVE,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: Type.FLIGHT,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: Type.CHECK_IN,
    offers: [
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: Type.SIGHTSEEING,
    offers: [
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: Type.RESTAURANT,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
      {
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
];
