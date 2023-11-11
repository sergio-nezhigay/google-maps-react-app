import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";
export const key = "AIzaSyD5sgxYjVndnPUYM4qwwX1yBRhtAaLPZaQ";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <section>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/*" element={<AdminPanel />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default App;
