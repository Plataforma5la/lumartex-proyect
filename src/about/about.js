import React from "react";

import aboutImage from "./assets/aboutImage.png";
import aboutImageMobile from "./assets/aboutImageMobile.png";

import "./about.css";

export default class About extends React.Component {
  render() {
    return (
      <div className="aboutContainer">
        <img
          alt=""
          src={window.innerWidth < 768 ? aboutImageMobile : aboutImage}
          className="aboutImage"
        />
        <div className="aboutGrid">
          <div>
            <div className="aboutTitle">ABOUT US </div>
          </div>
          <div className="aboutTextsGrid">
            <div className="aboutText">
              Founded in Austin, Texas through a partnership in excellence of
              two industry leaders; Lumartex specializes in education and
              corporate office environments. We strive to not only sell
              off-the-shelf products but to also provide custom products that
              solve real world problems through customer feedback and requests.
              Products like educational audio visual carts that fit into today’s
              flexible classroom environments. Also, ergonomic office products
              like our height adjustable monitor arms and sit and stand desks
              that promote an environment focused on employee health and
              productivity.
            </div>
            <div className="aboutTitle">MISSION</div>
            <div className="aboutText">
              Lumartex was founded with a clear mission and understanding from
              day one. Dedication to improve the classroom and office
              environment for all users. Do more and achieve more!
            </div>
          </div>
        </div>
      </div>
    );
  }
}
