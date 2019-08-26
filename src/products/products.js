import React from "react";

import "./products.css";
import CategoryBar from "./components/categorybar/categoryBar";
import Sidebar from "./components/sidebar/sidebar";
import Filters from "./components/filters/filters";
import SidebarMobile from "./components/sidebarMobile/sidebarMobile";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }
  render() {
    const { search, history } = this.props;
    const { open } = this.state;
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
        </div>
      </div>
    );
  }
}
