export function queryData(config) {
  const {
    priceRange: [min, max] = [100, 150],
    location = ['v-ker'],
    minRooms = 1,
  } = config;

  const base = `http://ingatlan.com/szukites/`;
  const params = `kiado+lakas+${location}+havi-${min}-${max}-ezer-Ft`;
  return fetch(base + params).then(res => res.text())
}
