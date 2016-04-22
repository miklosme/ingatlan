import { computeDestinationPoint } from 'geolib';

export function circleToRectangle(circle /*{ point, radius }*/) {
  const point = circle.point;
  const radius = circle.radius;
  LOG(point.latitude)
  return {
    northWest: computeDestinationPoint(point, radius, 225), //135
    southEast: computeDestinationPoint(point, radius, 45), //315
  };
}

export function pointToString({ latitude, longitude }, precision = 6) {
  const shortLat = latitude.toFixed(precision);
  const shortLon = longitude.toFixed(precision);
  return `${shortLat},${shortLon}`;
}

export function pointToStringFUCKEDUP({ latitude, longitude }, precision = 6) {
  const shortLat = latitude.toFixed(precision);
  const shortLon = longitude.toFixed(precision);
  return `${shortLon},${shortLat}`;
}
