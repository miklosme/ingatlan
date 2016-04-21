import { computeDestinationPoint } from 'geolib';

export function circleToRectangle({ circle: { point, radius } }) {
  const northWest = computeDestinationPoint(point, radius, 135);
  const southEast = computeDestinationPoint(point, radius, 315);
  return {
    northWest: `${northWest.latitude},${northWest.longitude}`,
    southEast: `${southEast.latitude},${southEast.longitude}`,
  };
}
