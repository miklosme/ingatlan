import { computeDestinationPoint } from 'geolib';

export function circleToRectangle({ point, radius }) {
  const { floor, sqrt } = Math;
  const rectangleDiagonalHalf = floor(sqrt(radius * radius * 2));
  return {
    southWest: computeDestinationPoint(point, rectangleDiagonalHalf, 225),
    northEast: computeDestinationPoint(point, rectangleDiagonalHalf, 45),
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
