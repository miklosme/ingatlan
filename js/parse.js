import cheerio from 'cheerio';
import S from 'string';
import { QUERY_TYPES } from './constants';

export function parseListResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $result = $(dataRow).map((index, el) => {
    const $item = $(el);
    const priceText = $item.find('.price-huf').text();
    const priceParts = priceText.split(' ');
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

export function parseSingleItem(text) {
  const $ = cheerio.load(text, {
    decodeEntities: false, // dont't screw the hungarian chars
  });

  const imageUrlPattern = new RegExp('https?:\\/\\/[a-z0-9_\\.\\/]+\\.(jpg|png)');

  const $bigImage = $('.listing-left .image-holder .image');
  const bigImageMatch = $bigImage.attr('style').match(imageUrlPattern);
  let bigImage = null;
  if (bigImageMatch && bigImageMatch.length > 0) {
    bigImage = bigImageMatch[0];
  }

  const thumbnails = '.listing-right li.thumbnail .image';

  const thumbnailImages = $(thumbnails).map((index, el) => {
    const style = $(el).attr('style');
    const match = style.match(imageUrlPattern);
    if (!match || match.length === 0) {
      return null;
    }
    return match[0];
  }).get().filter(e => !!e);

  const images = thumbnailImages.map(thumbnail => {
    return thumbnail.replace(/_m_0\.jpg$/, '_l_0.jpg');
  });

  const parameters = $('.paramterers tr').map((index, el) => {
    const $el = $(el);
    return {
      key: $el.children().first().text(),
      value: $el.children().last().text(),
    };
  }).get();

  return {
    description: $('.long-description').html(),
    thumbnailImages,
    images,
    bigImage,
    parameters,
  };
}
