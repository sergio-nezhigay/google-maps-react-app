import { getDistanceFromLine } from "geolib";

export default function filterPoints(origin, destination, points, maxDistance) {
  const linestart = { latitude: origin.lat, longitude: origin.lng };
  const lineend = { latitude: destination.lat, longitude: destination.lng };

  const filteredPoints = points.filter((point) => {
    const distanceFromRoute = getDistanceFromLine(point, linestart, lineend);

    return distanceFromRoute <= maxDistance;
  });

  return filteredPoints;
}
