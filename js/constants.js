import freeze from 'deep-freeze';

export const COLOR_BLUE = '#22B8D8';
export const COLOR_GREEN = '#19CAB6';
export const COLOR_LOCATION = '#19CAB688';
export const COLOR_LOCATION_BORDER = '#19CAB6AA';
export const COLOR_INACTIVE = '#ddd';
export const COLOR_ORANGE = '#ff6204';
export const COLOR_BACKGROUND = '#f5f5f5';
export const COLOR_BACKGROUND_APP = '#4CEAA2';
export const COLOR_TEXT = '#666';
export const COLOR_SEPARATOR = '#E4E4E4';

export const LATITUDE_BUDAPEST = 47.497617;
export const LONGITUDE_BUDAPEST = 19.05177;
export const LATITUDE_DELTA_BUDAPEST = 0.0522;

export const DEAL_TYPES = freeze({
  RENT: 'kiado',
  BUY: 'elado',
});
export const ESTATE_TYPES = freeze({
  FLAT: 'lakas',
  HOUSE: 'haz',
});
export const QUERY_TYPES = freeze({
  LIST: 'LIST',
  MAP: 'MAP',
});
export const RESULT_ORDER = freeze({
  NOTHING: 'NOTHING',
  PRICE_UP: 'ar-szerint',
  PRICE_DOWN: 'ar-szerint-csokkeno',
  DATE: 'DATE',
});
export const URLS = freeze({
  LIST: 'http://ingatlan.com/szukites/',
  MAP: 'http://ingatlan.com/terkep/',
  MAP_ADS: 'http://ingatlan.com/terkep/lista/',
  MAP_MARKERS: 'http://ingatlan.com/map/getFeatures?u=',
  SINGLE: 'http://ingatlan.com/',
});

/* eslint-disable max-len, quote-props */
export const FETCH_HEADERS = freeze({
  'Host': 'ingatlan.com',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36',
  'Referer': 'http://ingatlan.com/',
});
/* eslint-enable max-len, quote-props */
