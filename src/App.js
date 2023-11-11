import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import "./App.css";
export const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
};

export default App;

// import React from "react";
// import { LoadScript } from "@react-google-maps/api";
// import Map from "./components/Map";

// const lib = ["places"];
// export const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

// const App = () => (
//   <LoadScript googleMapsApiKey={key} libraries={lib}>
//     <Map />
//   </LoadScript>
// );

// export default App;
