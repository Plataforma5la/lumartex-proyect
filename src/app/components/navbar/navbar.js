import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import "./navbar.css";

import Dropdown from "./components/dropdown/dropdown";
import logo from "./assets/logo.svg";
import menu from "./assets/menu.svg";
import close from "./assets/close.svg";
import search from "./assets/search.svg";
import arrow from "./assets/right-arrow.svg";
import prev from "./assets/prev.svg";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      products: {
        name: [],
        partNumber: []
      },
      openSearch: false
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth >= 768) this.setState({ openMenu: true });
  }
  handleSearch(e) {
    e.preventDefault();
    this.setState(({ openSearch }) => ({ openSearch: !openSearch }));
  }
  handleMenu(e) {
    e.preventDefault();
    this.setState(({ openMenu }) => ({ openMenu: !openMenu }));
  }
  handleChange(e) {
    e.preventDefault();
    if (e.target.value === "")
      this.setState({ products: { name: [], partNumber: [] } });
    else {
      Axios.get(`http://10.100.0.55:8080/api/products?q=${e.target.value}`)
        .then(res => res.data)
        .then(products => {
          this.setState({ products });
        });
    }
  }
  render() {
    const width = window.innerWidth;
    const { openMenu, products, openSearch } = this.state;
    return (
      <div className="navbarContainer">
        {openSearch ? null : (
          <Link to="/" id="navbarHome">
            <img src={logo} alt="logo" className="navbarLogo" />
          </Link>
        )}
        {openMenu ? (
          <div className="navbarSections">
            <Link className="navbarSection" to="/about" id="navbarAbout">
              about us
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/products" id="navbarProducts">
              products
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/support" id="navbarSupport">
              support
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link className="navbarSection" to="/contact" id="navbarContact">
              contact
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
          </div>
        ) : null}
        <div className="navbarSearch">
          <div className="dividerInput" />
          <img src={search} alt="search" className="search" />
          <input
            type="text"
            placeholder="VM-HL28"
            onChange={this.handleChange}
            onClick={this.handleSearch}
          />
          {openSearch ? <Dropdown products={products} /> : null}
        </div>
        {width < 768 ? (
          <div>
            {openSearch ? (
              <div className="navbarSearchMobile" onScroll={this.handleSearch}>
                <div className="dividerInputMobile" />
                <img
                  src={prev}
                  alt="search"
                  className="prev"
                  onClick={this.handleSearch}
                />
                <img
                  src={search}
                  alt="search"
                  className="searchActive"
                  onClick={this.handleSearch}
                />
                <input
                  type="text"
                  placeholder="VM-HL28"
                  onChange={this.handleChange}
                  autoFocus
                />
              </div>
            ) : (
              <div>
                <img
                  src={search}
                  alt="search"
                  className="searchMobile"
                  onClick={this.handleSearch}
                />
                <img
                  src={openMenu ? close : menu}
                  alt={openMenu ? "close" : "menu"}
                  className={openMenu ? "close" : "menu"}
                  onClick={this.handleMenu}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
