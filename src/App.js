import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import AdminPanel from './pages/AdminPanel'
const lib = ["places"];
const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

const App = () => (
  // <LoadScript googleMapsApiKey={key} libraries={lib}>
  //   <Map />
  // </LoadScript>
    <AdminPanel></AdminPanel>

);

export default App;
