// Количество точек на главной
export const COUNTER = 3;

// Перечисление возможных позиций добавляемого элемента относительно элемента
export const position = {
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_END: 'beforeend', // сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

//
export const event = {
  types: {
    taxi: 'Taxi',
    bus: 'Bus',
    train: 'Train',
    ship: 'Ship',
    transport: 'Transport',
    drive: 'Drive',
    flight: 'Flight',
    checkIn: 'Check-in',
    sightseeng: 'Sightseeng',
    restaurant: 'Restaurant',
  },
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
  destinations: [
    {
      city: 'Amsterdam',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nisi enim doloribus? Maxime perferendis distinctio, consequatur, facere totam voluptatem est rem odio optio quod magnam non deleniti sit impedit accusamus..',
    },
    {
      city: 'Rotterdam',
      description: 'Earum exercitationem ullam dignissimos aliquam alias est natus accusantium quasi cupiditate saepe mollitia tempore sequi odio, dolores libero corporis molestiae non beatae et excepturi? Consequuntur, laboriosam voluptatem. Est, voluptatum aliquid?',
    },
    {
      city: 'The Hague',
      description: 'Culpa id eius ex ullam possimus eligendi? Quae ducimus quasi quaerat. Minus nam voluptatibus, repellat maxime eum quidem! Vitae voluptas, deleniti consectetur eum doloribus maiores dolorum! Placeat laudantium quibusdam alias.',
    },
    {
      city: 'Utrecht',
      description: 'Pariatur nobis necessitatibus dolorem magnam asperiores eius praesentium iusto aut numquam dignissimos, repellat modi quis in quisquam sequi soluta commodi accusamus a iste! Explicabo repudiandae quos in excepturi incidunt porro.',
    },
    {
      city: 'Eindhoven',
      description: 'Ea, eligendi earum quaerat delectus consequuntur magnam tempore veritatis expedita esse porro possimus at nam dolores, minima cumque harum iure quae animi obcaecati nobis labore. Ex distinctio reiciendis repellendus sed.',
    },
    {
      city: 'Groningen',
      description: 'Tempore sapiente hic, animi, quo atque est ex neque distinctio cupiditate exercitationem minima fuga officiis tenetur, debitis quos consequatur eaque vel veritatis delectus? Obcaecati expedita, aut placeat illo fugit aperiam.',
    },
    {
      city: 'Tilburg',
      description: 'Natus officiis nemo quibusdam, vero quo, aperiam vitae velit impedit odit exercitationem rem voluptates, fugiat nesciunt. Quae soluta illum nesciunt odio ex corporis recusandae. Reprehenderit nisi neque laboriosam nihil amet!',
    },
  ],
};
