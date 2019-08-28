import "./categoriesWhitTitle.css";

import React from "react";

export default class CategoriesWhitTitle extends React.Component {
  render() {
    const { categorie, showChildrens } = this.props;
    return (
      <div className="categoriesWhitTitleContainer">
        <div className="childrenTitle">{categorie.title}</div>
        {categorie.categories
          ? showChildrens(categorie.categories, true, "akjefhbkjefb")
          : categorie.name}
      </div>
    );
  }
}
