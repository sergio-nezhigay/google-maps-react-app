import { useEffect, useState } from "react";
import rawPlaces from "../convertcsv.json";
const places = [];

export default function useInitMarkers() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    rawPlaces.forEach((item, index) => {
      if (+item?.AB > 20) {
        places.push({
          id: index,
          position: { lat: +item.AB, lng: +item.AC },
          info: item.C,
        });
      }
    });
    setMarkers(places);
  }, []);

  return markers;
}
