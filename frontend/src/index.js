/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "common/Header";
import Side from "common/Side";
import App from "App";
import "resources/css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "reportWebVitals";
import Guild from "view/guild/guild";
import Union from "view/union/union";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Header />
      <Side />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/v/guild" element={<Guild />} />
        {/* <Route path="/v/union" element={<Union />} /> 너무 어려워서 보류*/}
      </Routes>
    </BrowserRouter>
);
reportWebVitals();
