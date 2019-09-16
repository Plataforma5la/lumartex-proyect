import React from "react";
import Axios from "axios";

import "./products.css";

import CategoryBar from "./components/categorybar/categoryBar";
import Sidebar from "./components/sidebar/sidebar";
import Filters from "./components/filters/filters";
import SidebarMobile from "./components/sidebarMobile/sidebarMobile";
import GridProducts from "./components/gridProducts/gridProducts";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      products: []
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }

  componentDidMount() {
    console.log("me monte");
    if (this.props.search) {
      const categories = decodeURI(this.props.search.slice(1).split(";"));
      Axios.post("http://localhost:8080/api/products/categorie", {
        categories
      })
        .then(res => res.data)
        .then(products => this.setState({ products }));
    }
  }

  componentDidUpdate(prevProps) {
    const categories = decodeURI(this.props.search.slice(1).split(";"));
    if (prevProps.search !== this.props.search) {
      Axios.post("http://localhost:8080/api/products/categorie", {
        categories
      })
        .then(res => res.data)
        .then(products => this.setState({ products }));
    }
  }
  render() {
    const { search, history } = this.props;
    const { open, products } = this.state;
    console.log("Todos los productos", products);
    return (
      <div className="productsContainer">
        {window.innerWidth < 768 ? (
          open ? (
            <SidebarMobile
              history={history}
              search={search}
              handleOpen={this.handleOpen}
            />
          ) : null
        ) : (
          <Sidebar history={history} search={search} />
        )}
        <div>
          {window.innerWidth < 768 ? (
            <Filters
              handleOpen={this.handleOpen}
              open={open}
              search={search}
              history={history}
            />
          ) : null}
          <CategoryBar path={search && decodeURI(search)} history={history} />
          <div className="productsDivider" />
          <GridProducts products={products} search={search} />
        </div>
      </div>
    );
  }
}
