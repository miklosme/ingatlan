import {
  DEAL_TYPES,
  ESTATE_TYPES,
  QUERY_TYPES,
  URLS,
  FETCH_HEADERS,
  RESULT_ORDER,
} from './constants';
import { circleToRectangle, pointToLongitudeFirstString } from './geo';

function download(url, options) {
  LOG(`Fetch started: ${url}`); // eslint-disable-line no-undef, new-cap

  const config = Object.assign({}, {
    method: 'get',
    headers: FETCH_HEADERS,
  }, options);

  return fetch(url, config);
}

function makeUrlParams(config, order) {
  const {
    dealType = DEAL_TYPES.RENT,
    priceRange: [min, max],
    location: { settlement },
    minRooms = 1,
    estateType = ESTATE_TYPES.FLAT,
    } = config;

  const urlComponents = [dealType, estateType];

  if (min || max) {
    if (!min) {
      urlComponents.push(`${max}-ezer-Ft-ig`);
    } else if (!max) {
      urlComponents.push(`${min}-ezer-Ft-tol`);
    } else {
      urlComponents.push(`havi-${min}-${max}-ezer-Ft`);
    }
  }

  if (minRooms > 1) {
    urlComponents.push(`${minRooms}-szoba-felett`);
  }

  if (settlement) {
    urlComponents.push(settlement.join('+'));
  }

  if (order) {
    if (order === RESULT_ORDER.PRICE_UP) {
      urlComponents.push(RESULT_ORDER.PRICE_UP);
    } else if (order === RESULT_ORDER.PRICE_DOWN) {
      urlComponents.push(RESULT_ORDER.PRICE_DOWN);
    }
  }

  return urlComponents.join('+');
}

export function queryListData(config, { pagination: page = 1, order }) {
  const base = URLS.LIST;
  const params = makeUrlParams(config, order);
  const pagination = page > 1 ? `?page=${page}` : '';

  const finalUrl = base + params + pagination;

  return download(finalUrl)
    .then(res => res.text())
    .then(text => ({
      queryType: QUERY_TYPES.LIST,
      data: text,
    }));
}

export function queryMapData(config, { pagination: page = 1, order }) {
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
