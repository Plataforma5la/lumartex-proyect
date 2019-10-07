import React from "react";

import "./categorieUpload.css";

export default class CategorieUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };
  showChildrens = categories => {
    return categories.map(categorie => {
      return <CategorieUpload categorie={categorie} />;
    });
  };
  render() {
    const { categorie } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div
          onClick={this.handleOpen}
          className={open ? "categorieUploadActive" : "categorieUpload"}
        >
          {categorie && categorie.name}
        </div>
        <div className="childrenCategorieUpload">
          {categorie &&
            categorie.categories &&
            open &&
            this.showChildrens(categorie.categories)}
        </div>
      </div>
    );
  }
}
