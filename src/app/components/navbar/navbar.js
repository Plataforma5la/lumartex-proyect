import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

import logo from "./assets/logo.svg";
import menu from "./assets/menu.svg";
import close from "./assets/close.svg";
import search from "./assets/search.svg";
import arrow from "./assets/right-arrow.svg";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth >= 768) this.setState({ openMenu: true });
  }

  handleMenu(e) {
    e.preventDefault();
    this.setState(({ openMenu }) => ({ openMenu: !openMenu }));
  }

  render() {
    const width = window.innerWidth;
    const { openMenu } = this.state;
    return (
      <div className="navbarContainer">
        <Link to="/">
          <img src={logo} alt="logo" className="navbarLogo" />
        </Link>
        {openMenu ? (
          <div className="navbarSections">
            <Link className="navbarSection" to="/about">
              about us
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/products">
              products
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/support">
              support
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/contact">
              contact
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
          </div>
        ) : null}
        <div className="navbarSearch">
          <div className="dividerInput" />
          <img src={search} alt="search" className="search" />
          <input type="text" placeholder="VM-HL28" />
        </div>
        {width < 768 ? (
          <div>
            <img src={search} alt="search" className="searchMobile" />
            <img
              src={openMenu ? close : menu}
              alt={openMenu ? "close" : "menu"}
              className={openMenu ? "close" : "menu"}
              onClick={this.handleMenu}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
