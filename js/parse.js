import cheerio from 'cheerio';
import S from 'string';

export function parseResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $addresses = $(dataRow).map((index, el) => {
    const $item = $(el);
    return $item.find('.address-highlighted').text();
  });

  const $allResultCount = $('#search-results-main .results-num');
  const allResultCount = parseInt($allResultCount.text().split(' ')[0], 10);

  const result = $addresses.get();

  return {
    result,
    allResultCount,
    hasMore: result.length > 0,
  };
}
