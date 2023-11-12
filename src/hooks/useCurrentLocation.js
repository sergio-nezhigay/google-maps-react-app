import { useState, useEffect } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude, error: null });
    };

    const errorHandler = (error) => {
      setLocation({ lat: null, lng: null, error: error.message });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
        options
      );
    } else {
      setLocation({
        lat: null,
        lng: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  return location.error ? null : location;
};

export default useCurrentLocation;
