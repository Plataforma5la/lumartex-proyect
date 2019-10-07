import React from "react";
import { Link } from "react-router-dom";

import "./footer.css";

import logo from "./assets/logo.svg";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="footerTop">
          <Link to="/">
            <img src={logo} alt="logo" className="footerLogo" />
          </Link>
          <div className="footerSections">
            <Link className="footerSection" to="/about">
              about us
            </Link>
            <Link className="footerSection" to="/products">
              products
            </Link>
            <Link className="footerSection" to="/support">
              support
            </Link>
            <Link className="footerSection" to="/contact">
              contact
            </Link>
          </div>
        </div>

        <div className="footerDivider" />

        <div className="footerRights">
          © 2019, Lumartex. All rights reserved.
        </div>
      </div>
    );
  }
}
