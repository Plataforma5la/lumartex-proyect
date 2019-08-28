import React from "react";

import "./categoryBar.css";

import close from "./components/close.svg";

export default class CategoryBar extends React.Component {
  handleClick(search, categorie, history) {
    const path = decodeURI(search)
    const newPath = path.slice(0, path.indexOf(categorie)-1);
    history.push(`/products${newPath}`);
  }
  render() {
    const { path, history } = this.props;
    const categories = path && decodeURI(path.slice(1));
    return (
      <div className="categoryBarContainer">
        {categories ? (
          categories.split(";").map(category => {
            return (
              <div className="pathContainer" key={category}>
                <div className="pathName">{category}</div>
                <img
                  src={close}
                  alt=""
                  className="pathClose"
                  onClick={() => this.handleClick(path, category, history)}
                />
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
