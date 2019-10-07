import React from "react";
import { connect } from "react-redux";

import "./sidebar.css";

import Categorie from "./components/categorie/categorie";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { history, search } = this.props;
    return (
      <div className="sidebarContainer">
        <div className="sidebarTitle">Products</div>
        {this.props.categories &&
          this.props.categories.map((categorie, i) => {
            return (
              <Categorie
                categorie={categorie}
                key={i}
                history={history}
                search={search}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.configReducer.config.categories
  };
};
export default connect(
  mapStateToProps,
  null
)(Sidebar);
