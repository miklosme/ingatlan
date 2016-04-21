import { DEAL_TYPES, ESTATE_TYPES, QUERY_TYPES } from './constants';
import { circleToRectangle } from './geo';

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

function createResponsePromise(queryType, config, page = 1) {
  const base = 'http://ingatlan.com/szukites/';
  const params = makeUrlParams(config);

  const pagination = page > 1 ? `?page=${page}` : '';
  const finalUrl = base + params + pagination;

  LOG(`Fetch started, page: ${finalUrl}`); // eslint-disable-line no-undef, new-cap

  return fetch(finalUrl)
    .then(res => res.text())
    .then(text => ({
      queryType,
      text,
    }));
}

export function queryData(config, page = 1) {
  return createResponsePromise(QUERY_TYPES.LIST, config, page);
}

export function queryMapData(config, page = 1) {
  /*const base = 'http://ingatlan.com/terkep/lista/';
  const params = makeUrlParams(config);
  const { northWest, southEast } = circleToRectangle(config.location);
  const boundingBox = `bb:${northWest},${southEast}`;
  const extended = [params, boundingBox].join('+');
  LOG(base + extended);*/
  return createResponsePromise(QUERY_TYPES.MAP, config, page);
}
