import { DEAL_TYPES, ESTATE_TYPES } from './constants';

function makeUrlParams(config) {
  const {
    dealType = DEAL_TYPES.RENT,
    priceRange: [min, max] = [100, 150],
    location: { settlement = [''] },
    minRooms = 1,
    estateType = ESTATE_TYPES.FLAT,
  } = config;

  const price = `havi-${min}-${max}-ezer-Ft`;
  const rooms = minRooms > 1 ? `${minRooms}-szoba-felett` : '';
  const where = settlement.join('+');

  return [dealType, estateType, where, price, rooms].join('+');
}

function createResponsePromise(url, page = 1) {
  const pagination = page > 1 ? `?page=${page}` : '';
  const finalUrl = url + pagination;

  LOG(`Fetch started, page: ${finalUrl}`); // eslint-disable-line no-undef, new-cap

  return fetch(finalUrl).then(res => res.text());
}

export function queryData(config, page = 1) {
  const base = 'http://ingatlan.com/szukites/';
  const params = makeUrlParams(config);
  return createResponsePromise(base + params, page);
}

export function queryMapData(config, page = 1) {
  const base = 'http://ingatlan.com/terkep/';
  const params = makeUrlParams(config);
  const map = '';
  return createResponsePromise(base + params + map, page);
}
