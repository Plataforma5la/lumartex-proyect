import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { connect } from "react-redux";

import "react-alice-carousel/lib/alice-carousel.css";
import "./homeCategories.css";

class HomeCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    const { apiUrl } = this.props;
    apiUrl && this.getCategories(apiUrl);
  }

  componentDidUpdate(prevProps) {
    const { apiUrl } = this.props;
    if (prevProps.apiUrl !== apiUrl) {
      this.getCategories(apiUrl);
    }
  }

  getCategories = apiUrl => {
    Axios.get(`${apiUrl}/api/categories?q=`)
      .then(res => res.data)
      .then(categories => {
        this.setState({ categories });
      });
  };

  render() {
    const { categories } = this.state;
    const components =
      categories &&
      categories.map(category => (
        <div className="categoryCard" key={category._id}>
          <div className="categoryTitle">
            {category.description}
            <Link to={`/products?${category.description}`}>
              <div className="categoryLink">View All →</div>
            </Link>
          </div>
          <img
            src={require(`./assets/${category.image}`)}
            alt="img"
            className="categoryImage"
          />
        </div>
      ));

    return (
      <div className="categoriesContainer">
        {this.props.width < 768 ? (
          <div className="sliderContainer">
            <div className="titleMobile">our products</div>
            <AliceCarousel
              mouseDragEnabled
              items={components}
              duration={200}
              infinite={false}
              buttonsDisabled
            ></AliceCarousel>
          </div>
        ) : (
          <div className="categoriesContent">{components}</div>
        )}
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
)(HomeCategories);
