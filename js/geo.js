import { computeDestinationPoint } from 'geolib';

// `geolib` specific constans
const SOUTH_WEST = 225;
const NORTH_EAST = 45;

export function circleToRectangle({ point, radius }) {
  const { floor, sqrt } = Math;
  const rectangleDiagonalHalf = floor(sqrt(radius * radius * 2));
  return {
    southWest: computeDestinationPoint(point, rectangleDiagonalHalf, SOUTH_WEST),
    northEast: computeDestinationPoint(point, rectangleDiagonalHalf, NORTH_EAST),
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
