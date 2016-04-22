import { computeDestinationPoint } from 'geolib';

export function circleToRectangle(circle /*{ point, radius }*/) {
  const point = circle.point;
  const radius = circle.radius;
  return {
    southWest: computeDestinationPoint(point, radius, 225), //135
    northEast: computeDestinationPoint(point, radius, 45), //315
  };
}

export function pointToLatitudeFirstString({ latitude, longitude }, precision = 6) {
  const shortLat = latitude.toFixed(precision);
  const shortLon = longitude.toFixed(precision);
  return `${shortLat},${shortLon}`;
}

export function pointToLongitudeFirstString({ latitude, longitude }, precision = 6) {
  const shortLat = latitude.toFixed(precision);
  const shortLon = longitude.toFixed(precision);
  return `${shortLon},${shortLat}`;
}
