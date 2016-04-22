import { DEAL_TYPES, ESTATE_TYPES, QUERY_TYPES, URLS, FETCH_HEADERS } from './constants';
import { circleToRectangle, pointToStringFUCKEDUP } from './geo';

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

export function queryListData(config, page = 1) {
  const base = URLS.LIST;
  const params = makeUrlParams(config);
  const pagination = page > 1 ? `?page=${page}` : '';

  const finalUrl = base + params + pagination;
  LOG(`Fetch started, page: ${finalUrl}`); // eslint-disable-line no-undef, new-cap

  return fetch(finalUrl, {
    method: 'get',
    headers: FETCH_HEADERS,
  })
    .then(res => res.text())
    .then(text => ({
      queryType: QUERY_TYPES.LIST,
      text,
    }));
}

export function queryMapData(config, page = 1) {
  const params = makeUrlParams(config);
  const pagination = page > 1 ? `?page=${page}` : '';

  const { northWest, southEast } = circleToRectangle(config.location.circle);
  const topLeft = pointToStringFUCKEDUP(northWest);
  const bottomRight = pointToStringFUCKEDUP(southEast);
  const boundingBox = `bb:${topLeft},${bottomRight}`;
  const paramsWithMap = `${params}+${boundingBox}`;

  const urlAds = URLS.MAP_ADS + paramsWithMap + pagination;
  const urlMarkersNonworking = URLS.MAP_MARKERS + encodeURIComponent(paramsWithMap);
  const urlMarkers = URLS.MAP_MARKERS + encodeURIComponent(params) + '%2Bbb%3A19.078207%2C47.446648%2C19.176054%2C47.515569';
  LOG(`Fetch started, map with side-ads: ${urlAds}`); // eslint-disable-line no-undef, new-cap
  LOG(`Fetch started, not goot: ${urlMarkersNonworking}`); // eslint-disable-line no-undef, new-cap
  LOG(`Fetch started, map's markers: ${urlMarkers}`); // eslint-disable-line no-undef, new-cap

  const ads = fetch(urlAds, {
    method: 'get',
    headers: FETCH_HEADERS,
  })
    .then(res => res.json());

  const markers = fetch(urlMarkersNonworking, {
    method: 'get',
    headers: FETCH_HEADERS,
  })
    .then(res => res.json());

  return Promise
    .all([ads, markers])
    .then(([adsJson, markersJson]) => {
      LOG('swaggg', Object.keys(adsJson), Object.keys(markersJson));
      throw new Error('unimplemented.');
      return;
    });
}
