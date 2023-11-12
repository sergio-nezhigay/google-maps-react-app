// import { useEffect, useState } from "react";
// import rawPlaces from "../data/sample-data.json";

// const places = [];

// export default function useInitMarkers() {
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     rawPlaces.forEach((item, index) => {
//       if (
//         item.name &&
//         item.coordinates.latitude &&
//         item.coordinates.longitude
//       ) {
//         places.push({
//           id: index,
//           position: {
//             lat: +item.coordinates.latitude,
//             lng: +item.coordinates.longitude,
//           },
//           info: item.name,
//           description: item.description,
//           type: item.type,
//           accessibilities: item.accessibility,
//           schedule: item.schedule,
//         });
//       }
//     });
//     setMarkers(places);
//   }, []);

//   return markers;
// }
