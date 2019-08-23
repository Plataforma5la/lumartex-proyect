import React from "react";

import "./products.css";
import CategoryBar from "./components/categorybar/categoryBar";
import Sidebar from "./components/sidebar/sidebar";

export default class Products extends React.Component {
  render() {
    const { search, history } = this.props;
    return (
      <div className="productsContainer">
        <Sidebar history={history} search={search}/>
        <div>
          <CategoryBar path={search && decodeURI(search)} />
          <div className="productsDivider" />
        </div>
      </div>
    );
  }
}
