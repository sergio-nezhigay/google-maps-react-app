export default function isInKyiv(latitude, longitude) {
  const kyivBounds = {
    north: 50.59,
    south: 50.2136,
    west: 30.2394,
    east: 30.8254,
  };

  const withinLatitudeBounds =
    latitude >= kyivBounds.south && latitude <= kyivBounds.north;
  const withinLongitudeBounds =
    longitude >= kyivBounds.west && longitude <= kyivBounds.east;

  return withinLatitudeBounds && withinLongitudeBounds;
}
