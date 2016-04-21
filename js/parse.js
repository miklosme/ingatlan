import cheerio from 'cheerio';
import S from 'string';
import { QUERY_TYPES } from './constants';

function parseListResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $addresses = $(dataRow).map((index, el) => {
    return $(el).find('.address-highlighted').text();
  });

  const allResultText = $('#search-results-main .results-num').text() || '0';
  const allResultCount = parseInt(allResultText.match(/\d/g).join(''), 10);
  return {
    allResultCount,
    result: $addresses.get(),
  };
}

function parseMapResponse() {
  const allResultText = '0';
  //const allResultText = $('#supportive-list #advert-count').text() || '0';
  const allResultCount = parseInt(allResultText.match(/\d/g).join(''), 10);

  return {
    allResultCount,
    result: [],
  };
}

export function parseResponse({ queryType, text }) {
  let response = null;

  if (queryType === QUERY_TYPES.LIST) {
    response = parseListResponse(text);
  } else {
    //response = parseMapResponse(data);
  }

  return {
    result: response.result,
    allResultCount: response.allResultCount,
    hasMore: response.result.length > 0,
  };
}
