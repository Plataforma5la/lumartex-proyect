import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import "./products.css";

import CategoryBar from "./components/categorybar/categoryBar";
import Sidebar from "./components/sidebar/sidebar";
import Filters from "./components/filters/filters";
import SidebarMobile from "./components/sidebarMobile/sidebarMobile";
import GridProducts from "./components/gridProducts/gridProducts";

class Products extends React.Component {
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
    const { apiUrl } = this.props;
    apiUrl && this.getProducts(apiUrl);
  }

  componentDidUpdate(prevProps) {
    const { apiUrl } = this.props;

    if (prevProps.apiUrl !== apiUrl) {
      this.getProducts(apiUrl);
    }
    if (prevProps.search !== this.props.search) {
      this.getProducts(apiUrl);
    }
  }

  getProducts = apiUrl => {
    const categories = this.props.search.slice(1).split(";");
    Axios.post(`${apiUrl}/api/products/categorie`, {
      categories
    })
      .then(res => res.data)
      .then(products => {
        this.setState({ products });
      });
  };

  render() {
    const { search, history } = this.props;
    const { open, products } = this.state;
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

const mapStateToProps = state => {
  return {
    apiUrl: state.configReducer.config.apiUrl
  };
};
export default connect(
  mapStateToProps,
  null
)(Products);
