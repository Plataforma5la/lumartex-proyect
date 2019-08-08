import React from "react";

import arrow from "./assets/arrow.svg";
import arrowDesktop from "./assets/arrowDesktop.svg";

import "./heroSection.css";

export default class HeroSection extends React.Component {
  render() {
    return (
      <div>
        {window.innerWidth < 768 ? (
          <div>
            <img
              src={require("./assets/background-image-mobile.jpg")}
              className="heroContainer"
              alt=""
            />
            <div className="heroTitle">SIT STAND LAPTOP</div>
            <button className="heroButton">VIEW PRODUCT</button>
            <img src={arrow} alt="arrow" className="heroArrow" />
          </div>
        ) : (
          <div className="heroContainer">
            <div className="heroTitle">SIT STAND LAPTOP</div>
            <button className="heroButton">VIEW PRODUCT</button>
            <img src={arrowDesktop} alt="arrowDesktop" className="heroArrow" />
          </div>
        )}
      </div>
    );
  }
}
