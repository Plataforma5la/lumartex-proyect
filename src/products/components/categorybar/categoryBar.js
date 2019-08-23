import React from "react";

import "./categoryBar.css";

import close from "./components/close.svg";

export default class CategoryBar extends React.Component {
  render() {
    const { path } = this.props;
    const categories = path && decodeURI(path.slice(1));
    return (
      <div className="categoryBarContainer">
        {categories ? (
          categories.split(";").map(category => {
            return (
              <div className="pathContainer" key={category}>
                <div className="pathName">{category}</div>
                <img src={close} alt="" className="pathClose" />
              </div>
            );
          })
        ) : (
          <div className="noneProducts">Select a category to find products</div>
        )}
      </div>
    );
  }
}
