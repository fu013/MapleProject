import logo from "./logo.svg";
import "resources/css/App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }, []);
  return <div className="App"></div>;
}

export default App;
