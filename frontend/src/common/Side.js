/* eslint-disable jsx-a11y/alt-text */
import "resources/css/side.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Side() {
  const location = useLocation();
  useEffect(() => {
    let path = location.pathname.split("/");
    path = path[path.length - 1];
    if (document.getElementById(path)) {
      document.getElementById("aside").classList.add("active");
    } else {
      document.getElementById("aside").classList.remove("active");
    }
  }, [location]);
  return <aside id="aside">사이드바</aside>;
}

export default Side;
