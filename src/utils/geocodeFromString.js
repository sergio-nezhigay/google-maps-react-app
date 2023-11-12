import { key } from "../App";

const geocodeFromString = async (destination) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        destination
      )}&key=${key}`
    );

    if (!response.ok) {
      throw new Error("Помилка геокодування");
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;

      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error("Місце призначення не знайдено");
    }
  } catch (error) {
    console.error(error.message);
    return { lat: 0, lng: 0 };
  }
};

export default geocodeFromString;
