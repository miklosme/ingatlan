import cheerio from 'cheerio';
import S from 'string';

export function parseResponse(text) {
  const $ = cheerio.load(text);

  const dataRow = '#search-results-main table.search-results > tbody > tr[data-id]';

  const $addresses = $(dataRow).map((index, el) => {
    const $item = $(el);
    return $item.find('.address-highlighted').text();
  });

  return $addresses.get();
}
