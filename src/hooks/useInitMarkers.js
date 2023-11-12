import { useEffect, useState } from "react";

export default function useInitMarkers() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://iewdkvrp3d.eu-central-1.awsapprunner.com/api/v1/map/geo-object"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const places = data
          .map((item, index) => {
            if (
              item.name &&
              item.coordinates.latitude &&
              item.coordinates.longitude
            ) {
              return {
                id: index,
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


