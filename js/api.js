import { DEAL_TYPES, ESTATE_TYPES, QUERY_TYPES, URLS, FETCH_HEADERS } from './constants';
import { circleToRectangle, pointToLongitudeFirstString } from './geo';

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

  const { southWest, northEast } = circleToRectangle(config.location.circle);
  const bottomLeft = pointToLongitudeFirstString(southWest);
  const topRight = pointToLongitudeFirstString(northEast);
  const boundingBox = `bb:${bottomLeft},${topRight}`;
  const paramsWithMap = `${params}+${boundingBox}`;

  const urlAds = URLS.MAP_ADS + paramsWithMap + pagination;
  const urlMarkers = URLS.MAP_MARKERS + encodeURIComponent(paramsWithMap);
  LOG(`Fetch started, map with side-ads: ${urlAds}`); // eslint-disable-line no-undef, new-cap
  LOG(`Fetch started, map's markers: ${urlMarkers}`); // eslint-disable-line no-undef, new-cap

  const ads = fetch(urlAds, {
    method: 'get',
    headers: FETCH_HEADERS,
  })
    .then(res => res.json());

  const markers = fetch(urlMarkers, {
    method: 'get',
    headers: FETCH_HEADERS,
  })
    .then(res => res.json());

  return Promise
    .all([ads, markers])
    .then(([adsJson, markersJson]) => {
      LOG('map result keys: ', Object.keys(adsJson), Object.keys(markersJson));
      throw new Error('unimplemented.');
      return {
        queryType: QUERY_TYPES.MAP,
        data: {
          adsJson,
          markersJson,
        },
      };
    });
}
