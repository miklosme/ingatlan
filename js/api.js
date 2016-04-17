export function queryData(config) {
  var url = `http://ingatlan.com/szukites/kiado+lakas+v-ker+havi-100-150-ezer-Ft`;
  return fetch(url).then((res) => res.text())
}
