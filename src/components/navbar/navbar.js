import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

import "./navbar.css";

import Dropdown from "./components/dropdown/dropdown";
import logo from "./assets/logo.svg";
import menu from "./assets/menu.svg";
import close from "./assets/close.svg";
import search from "./assets/search.svg";
import arrow from "./assets/right-arrow.svg";
import prev from "./assets/prev.svg";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      inputValue: "",
      products: {
        name: [],
        partNumber: []
      },
      openSearch: false,
      statusMenu: false
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (this.props.width >= 768) this.setState({ openMenu: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.setState({
        inputValue: "",
        products: {
          name: [],
          partNumber: []
        },
        openSearch: false
      });
    }
    if (prevProps.page !== this.props.page && this.props.width <= 768) {
      this.setState({ openMenu: false });
    }
    if (prevProps.width !== this.props.width && this.props.width > 767) {
      this.setState({ openMenu: true });
    }
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState(({ openSearch }) => ({
      openSearch: !openSearch,
      openMenu: false
    }));
  }

  handleMenu(e) {
    e.preventDefault();
    this.setState(({ openMenu }) => ({ openMenu: !openMenu }));
  }

  handleClick = (e, path) => {
    e.preventDefault();
    if (this.state.statusMenu) {
      this.setState({ statusMenu: false });
    }
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
    if (e.target.value === "")
      this.setState({
        products: { name: [], partNumber: [] },
        statusMenu: false
      });
    else {
      Axios.get(`${this.props.apiUrl}/api/products?q=${e.target.value}`)
        .then(res => res.data)
        .then(products => {
          console.log("soy los products", products);
          this.setState({ products, statusMenu: true });
        });
    }
  }

  handleFocus = e => {
    e.preventDefault();
    if (this.state.inputValue) this.setState({ statusMenu: true });
  };

  render() {
    const width = this.props.width;
    const {
      openMenu,
      products,
      openSearch,
      inputValue,
      statusMenu
    } = this.state;
    const { page } = this.props;
    return (
      <div className="navbarContainer">
        {statusMenu ? (
          <div className="dropdownAbsolute" onClick={this.handleClick} />
        ) : null}
        {openSearch ? null : (
          <Link to="/" id="navbarHome">
            <img src={logo} alt="logo" className="navbarLogo" />
          </Link>
        )}
        {openMenu ? (
          <div className="navbarSections">
            <Link
              className={
                page === "/about" ? "navbarSectionActive" : "navbarSection"
              }
              to="/about"
              id="navbarAbout"
            >
              about us
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <Link
              className={
                page.includes("/products")
                  ? "navbarSectionActive"
                  : "navbarSection"
              }
              to="/products"
              id="navbarProducts"
            >
              products
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            {/* <Link
              className={
                page === "/support" ? "navbarSectionActive" : "navbarSection"
              }
              to="/support"
              id="navbarSupport"
            >
              support
              <img src={arrow} alt="arrow" className="arrow" />
            </Link> */}
            <Link
              className={
                page === "/contact" ? "navbarSectionActive" : "navbarSection"
              }
              to="/contact"
              id="navbarContact"
            >
              contact
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
          </div>
        ) : null}
        <div className="navbarSearch">
          <div className="dividerInput" />
          <img src={search} alt="search" className="search" />
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            <Dropdown
              products={products}
              statusMenu={statusMenu}
              handleClickProduct={this.handleClickProduct}
            />
          </div>
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
                  value={inputValue}
                  onChange={this.handleChange}
                  autoFocus
                  onFocus={this.handleFocus}
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

const mapStateToProps = state => {
  return {
    apiUrl: state.configReducer.config.apiUrl
  };
};
export default connect(
  mapStateToProps,
  null
)(Navbar);
