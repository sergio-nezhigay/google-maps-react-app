import { useEffect, useState } from "react";

import geoObjectAPI from "../utils/geoObjectAPI";

export default function useInitMarkers() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await geoObjectAPI.readlist();
        const places = data
          .map((item, index) => {
            if (
              item.name &&
              item.coordinates.latitude &&
              item.coordinates.longitude
            ) {
              return {
                id: item.id,
                position: {
                  lat: +item.coordinates.latitude,
                  lng: +item.coordinates.longitude,
                },
                info: item.name,
                description: item.description,
                type: item.type,
                accessibilities: item.accessibility,
                schedule: item.schedule,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        setMarkers(places);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return markers;
}
