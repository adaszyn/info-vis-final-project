import React from "react";
import "./Loader.css";
import loaderImage from "../../assets/finger-print.gif";

export const Loader = () => {
  return (
    <div className="loader-container">
      <img alt="loader" width={34} src={loaderImage} />
    </div>
  );
};
