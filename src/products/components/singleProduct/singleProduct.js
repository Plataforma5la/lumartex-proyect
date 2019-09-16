import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./singleProduct.css";

import arrowRight from "./assets/arrowRight.svg";
import arrowRightSlider from "./assets/arrowRightSlider.svg";
import arrowLeftSlider from "./assets/arrowRightSlider.svg";
import image from "./assets/image.png";

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      info: "description"
    };
    this.handleInfo = this.handleInfo.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  componentDidMount() {
    Axios.get(`http://localhost:8080/api/products/${this.props.id}`)
      .then(res => res.data[0])
      .then(product => this.setState({ product }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      Axios.get(`http://localhost:8080/api/products/${this.props.id}`)
        .then(res => res.data[0])
        .then(product => this.setState({ product }));
    }
    
  }

  handleInfo(info) {
    this.setState({ info });
  }

  render() {
    const { product, info } = this.state;
    const { categorie } = this.props;
    const settings = {
      centerMode: false,
      customPaging: function(i) {
        return (
          <li className="dotsSliderContainer">
            <img src={image} alt="" className="dotsSlider" />
          </li>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      slidesToShow: 1,
      width: 493,
      speed: 500,
      arrows: false,
      draggable: false
    };
    return (
      <div className="singleProductContainer">
        <div className="singleProductPath">
          <Link to={`/products?${categorie}`} className="spCategoriePath">
            {categorie}
          </Link>
          <img className="spCategoriePathArrow" src={arrowRight} alt="" />
          <div className="spCategoriePathName">{product.name}</div>
        </div>
        <div className="singleProductPresentation">
          <div className="singleProductTitle">
            <div className="singleProductName">{product.name}</div>
            <div className="singleProductSubname">
              Laptop stand and monitor mounts
            </div>
          </div>
          <div className="singleProductImages">
            <Slider {...settings} ref={c => (this.slider = c)}>
              <img src={image} alt="" className="singleProdImage" />
              <img src={image} alt="" className="singleProdImage" />
              <img src={image} alt="" className="singleProdImage" />
            </Slider>
            <div className="arrowsContainer">
              <img
                src={arrowLeftSlider}
                alt=""
                className="arrowLeftSlider"
                onClick={this.previous}
              />
              <img
                src={arrowRightSlider}
                alt=""
                className="arrowRightSlider"
                onClick={this.next}
              />
            </div>
          </div>
        </div>
        <div className="singleProductInformation">
          <div className="singleProductInfoTitles">
            <div
              className={
                info === "description"
                  ? "singleProductInfoActive"
                  : "singleProductInfoDesactive"
              }
              onClick={() => this.handleInfo("description")}
            >
              description
            </div>
            <div
              className={
                info === "specs"
                  ? "singleProductInfoActive"
                  : "singleProductInfoDesactive"
              }
              onClick={() => this.handleInfo("specs")}
            >
              specs
            </div>
          </div>
          <div className="singleProductInfoData">
            {info === "description" ? product.description : product.specs}
          </div>
        </div>
        <div className="relatedProducts">
          <div className="relatedProductsTitle"> Related Products</div>
          <div className="relatedProductsCards">
            <div className="product" key={product._id}>
              <img src={image} alt="" className="productImage" />
              <div className="productName">{product.name}</div>
              <div className="productDescription">
                Laptop stand and monitor mounts
              </div>
              <Link
                to={`/products/${product._id}/${categorie}`}
                className="productLink"
              >
                view more →
              </Link>
            </div>
            <div className="product" key={product._id}>
              <img src={image} alt="" className="productImage" />
              <div className="productName">{product.name}</div>
              <div className="productDescription">
                Laptop stand and monitor mounts
              </div>
              <Link
                to={`/products/${product._id}/${categorie}`}
                className="productLink"
              >
                view more →
              </Link>
            </div>
            <div className="product" key={product._id}>
              <img src={image} alt="" className="productImage" />
              <div className="productName">{product.name}</div>
              <div className="productDescription">
                Laptop stand and monitor mounts
              </div>
              <Link
                to={`/products/${product._id}/${categorie}`}
                className="productLink"
              >
                view more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
