import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "./homeCategories.css";

export default class HomeCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:8080/api/categories?q=")
      .then(res => res.data)
      .then(categories => {
        this.setState({ categories });
      });
  }
  render() {
    const { categories } = this.state;
    const components =
      categories &&
      categories.map(category => (
        <div className="categoryCard" key={category._id}>
          <div className="categoryTitle"> {category._source.description} </div>
          <Link to={`/products?${category._source.description}`}>
            <div className="categoryLink">View All →</div>
          </Link>
          <img
            src={require(`./assets/mobile-${category._source.image}`)}
            alt="img"
            className="categoryImage"
          />
        </div>
      ));

    return (
      <div className="categoriesContainer">
        {window.innerWidth < 768 ? (
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
          <div className="categoriesContent">
            {categories &&
              categories.map(category => (
                <div className="categoryCard" key={category._id}>
                  <div className="categoryTitle">
                    {" "}
                    {category._source.description}{" "}
                  </div>
                  <Link to={`/products?${category._source.description}`}>
                    <div className="categoryLink">View All →</div>
                  </Link>
                  <img
                    src={require(`./assets/${category._source.image}`)}
                    alt="img"
                    className="categoryImage"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
