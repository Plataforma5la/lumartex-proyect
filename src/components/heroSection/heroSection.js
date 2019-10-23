import React from "react";
import { Link } from "react-router-dom";
import arrow from "./assets/arrow.svg";
import arrowDesktop from "./assets/arrowDesktop.svg";

import "./heroSection.css";

export default class HeroSection extends React.Component {
  render() {
    return (
      <div>
        {this.props.width < 768 ? (
          <div>
            <img
              src={require("./assets/background-image-mobile.jpg")}
              className="heroContainer"
              alt=""
            />
            <div className="heroTitle">PRODUCTS</div>
            <button className="heroButton">
              <Link to="/products">VIEW PRODUCTS</Link>
            </button>
            <img src={arrow} alt="arrow" className="heroArrow" />
          </div>
        ) : (
          <div className="heroContainer">
            <div className="heroTitle">PRODUCTS</div>
            <button className="heroButton">
              <Link to="/products">VIEW PRODUCTS</Link>
            </button>
            <img src={arrowDesktop} alt="arrowDesktop" className="heroArrow" />
          </div>
        )}
      </div>
    );
  }
}
