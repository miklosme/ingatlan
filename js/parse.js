import cheerio from 'cheerio';
import S from 'string';
import { QUERY_TYPES } from './constants';

export function parseListResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $result = $(dataRow).map((index, el) => {
    const $item = $(el);
    const priceText = $item.find('.price-huf').text();
    const priceParts= priceText.split(' ');
    priceParts.splice(-2, 2);
    const price = parseInt(priceParts.join(''), 10);
    return {
      address: $item.find('.address-highlighted').text(),
      price,
      rooms: $item.find('.roomcount').text().replace(/fél/, ''),
      id: $item.data('id'),
      latitude: $item.data('lan'),
      longitude: $item.data('lon'),
      date: $item.data('ld'),
    };
  });

  const allResultText = $('#search-results-main .results-num').text() || '0';
  const allResultCount = parseInt(allResultText.match(/\d/g).join(''), 10);

  const result = $result.get();

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
