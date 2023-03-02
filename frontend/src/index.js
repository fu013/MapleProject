/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./common/Header";
import App from "./App";
import "./resources/css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Guild from "view/guild/guild";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/guild" element={<Guild />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
