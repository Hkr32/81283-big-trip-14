// Высота
export const BAR_HEIGHT = 55;

export const sortMoneyDown = (one, second) => {
  return second[1].money - one[1].money;
};
export const sortCountDown = (one, second) => {
  return second[1].count - one[1].count;
};
export const sortDurationDown = (one, second) => {
  return second[1].duration - one[1].duration;
};
