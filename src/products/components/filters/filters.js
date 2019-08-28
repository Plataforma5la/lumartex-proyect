import "./filters.css";

import React from "react";

import filterIcon from "./assets/filterIcon.svg";
import close from "./assets/close.svg";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ""
    };
    this.handleOpenLocal = this.handleOpenLocal.bind(this);
  }
  componentDidMount() {
    this.setState({ path: this.props.search });
  }
  handleOpenLocal() {
    if (this.state.path === this.props.search) {
      this.props.handleOpen();
    } else {
      this.props.history.push(`/products${this.state.path}`);
      this.props.handleOpen();
    }
  }
  render() {
    const { open } = this.props;
    return (
      <div className="filtersContainer">
        <div className="handlerFilters">
          <div className="filterTitle">Filters</div>
          <img
            alt=""
            src={open ? close : filterIcon}
            className={open ? "filterClose" : "filterIcon"}
            onClick={this.handleOpenLocal}
          />
        </div>
      </div>
    );
  }
}
