import { DEAL_TYPES, ESTATE_TYPES } from './constants';

export function queryData(config, page = 1) {
  const {
    dealType = DEAL_TYPES.RENT,
    priceRange: [min, max] = [100, 150],
    location = ['v-ker'],
    minRooms = 1,
    estateType = ESTATE_TYPES.FLAT,
  } = config;

  const base = `http://ingatlan.com/szukites/`;
  const price = `havi-${min}-${max}-ezer-Ft`;
  const rooms = minRooms > 1 ? `${minRooms}-szoba-felett` : ``;
  const where = location.join('+');
  const params = [dealType, estateType, where, price, rooms].join('+');
  const pagination = page > 1 ? `?page=${page}` : ``;

  const url = base + params + pagination;

  LOG('Fetch started, page: ' + url);

  return fetch(url).then(res => res.text())
}
