import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Map from "./components/Map";

const lib = ["places"];
const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

const App = () => (
  <LoadScript googleMapsApiKey={key} libraries={lib}>
    <Map />
  </LoadScript>
);

export default App;
