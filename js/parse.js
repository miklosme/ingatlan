import cheerio from 'cheerio';
import S from 'string';
import { QUERY_TYPES } from './constants';

export function parseListResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $addresses = $(dataRow).map((index, el) => {
    return $(el).find('.address-highlighted').text();
  });

  const allResultText = $('#search-results-main .results-num').text() || '0';
  const allResultCount = parseInt(allResultText.match(/\d/g).join(''), 10);

  const result = $addresses.get();

  return {
    allResultCount,
    hasMore: result.length > 0,
    result,
  };
}

export function parseMapResponse({ adsJson, markersJson }) {
  //LOG(Object.keys(adsJson));
  //throw new Error('staph')

  LOG(markersJson);

  const $ = cheerio.load(adsJson.html);
  const $addresses = $('.supportive-list-address').map((index, el) => {
    const text = $(el).text();
    const addressParts = text.split('\n');
    return addressParts[addressParts.length - 1];
  });

  const result = $addresses.get();

  return {
    allResultCount: adsJson.adCount,
    hasMore: result.length > 0,
    result,
  };
}
