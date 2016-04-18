import { DEAL_TYPES, ESTATE_TYPES } from './constants';

export function queryData(config) {
  const {
    dealType = DEAL_TYPES.RENT,
    priceRange: [min, max] = [100, 150],
    location = ['v-ker'],
    minRooms = 1,
    estateType = ESTATE_TYPES.FLAT,
  } = config;

  const base = `http://ingatlan.com/szukites/`;
  const price = `havi-${min}-${max}-ezer-Ft`;
  const where = location.join('+');
  const params = [dealType, estateType, where, price].join('+');

  return fetch(base + params).then(res => res.text())
}
