import { DEAL_TYPES, ESTATE_TYPES, QUERY_TYPES, URLS, FETCH_HEADERS } from './constants';
import { circleToRectangle, pointToLongitudeFirstString } from './geo';

function download(url, options) {
  LOG(`Fetch started: ${url}`); // eslint-disable-line no-undef, new-cap

  const config = Object.assign({}, {
    method: 'get',
    headers: FETCH_HEADERS,
  }, options);

  return fetch(url, config);
}

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

  return download(finalUrl)
    .then(res => res.text())
    .then(text => ({
      queryType: QUERY_TYPES.LIST,
      data: text,
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

  const ads = download(urlAds)
    .then(res => res.json());

  const markers = download(urlMarkers)
    .then(res => res.json());

  return Promise
    .all([ads, markers])
    .then(([adsJson, markersJson]) => ({
      queryType: QUERY_TYPES.MAP,
      data: {
        adsJson,
        markersJson,
      },
    }));
}
