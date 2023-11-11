import React from "react";
import { Container } from "react-bootstrap";
import { LoadScript } from "@react-google-maps/api";

import Map from "../components/Map";
const lib = ["places"];
export const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

function Home() {
  return (
    <Container className="mt-3">
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <Map />
      </LoadScript>
    </Container>
  );
}

export default Home;
