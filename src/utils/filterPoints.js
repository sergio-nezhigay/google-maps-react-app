// Function to calculate the distance between two sets of coordinates using Haversine formula
export function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in kilometers

  const lat1 = toRadians(coord1.lat);
  const lon1 = toRadians(coord1.lng);
  const lat2 = toRadians(coord2.lat);
  const lon2 = toRadians(coord2.lng);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Function to filter points that are close to the direct route between origin and destination
export default function filterPoints(origin, destination, points, maxDistance) {
  const filteredPoints = points.filter((point) => {
    const distanceFromRoute = calculateDistanceToRoute(
      origin,
      destination,
      point
    );
    return distanceFromRoute <= maxDistance;
  });

  return filteredPoints;
}

// Function to calculate the distance from a point to the direct route between origin and destination
function calculateDistanceToRoute(origin, destination, point) {
  const distanceOfRoute = calculateDistance(origin, destination);

  // Calculate the projection of the point onto the route
  const t =
    ((point.lat - origin.lat) * (destination.lat - origin.lat) +
      (point.lng - origin.lng) * (destination.lng - origin.lng)) /
    distanceOfRoute ** 2;

  const projectedPoint = {
    lat: origin.lat + t * (destination.lat - origin.lat),
    lng: origin.lng + t * (destination.lng - origin.lng),
  };

  // Calculate the distance from the original point to its projection on the route
  const distanceFromRoute = calculateDistance(point, projectedPoint);

  return distanceFromRoute;
}
