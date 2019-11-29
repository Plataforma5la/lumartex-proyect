import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Slider from "react-slick";
import AliceCarousel from "react-alice-carousel";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./singleProduct.css";

import arrowRight from "./assets/arrowRight.svg";
import arrowRightSlider from "./assets/arrowRightSlider.svg";
import arrowLeftSlider from "./assets/arrowRightSlider.svg";
import arrowDown from "./assets/arrowDown.svg";
import arrowDownBlue from "./assets/arrowDownBlue.svg";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      info: "description",
      descMobile: false,
      specsMobile: false,
      components: []
    };
  }
  componentDidMount() {
    const { apiUrl, id } = this.props;
    if (apiUrl) {
      Axios.get(`${apiUrl}/api/products/${id}`)
        .then(res => res.data[0])
        .then(product => {
          this.setState({ product });
          Axios.get(
            `${apiUrl}/api/products/relatedProducts/${id}/${
              product.categories[0]
            }`
          ).then(components => this.setState({ components: components.data }));
        })
        .catch(err => console.log(err));
    }
  }

  componentDidUpdate(prevProps) {
    const { apiUrl } = this.props;
    if (prevProps.id !== this.props.id || prevProps.apiUrl !== apiUrl) {
      window.scrollTo(0, 0);
      Axios.get(`${apiUrl}/api/products/${this.props.id}`)
        .then(res => res.data[0])
        .then(product => {
          this.setState({ product });
          Axios.get(
            `${apiUrl}/api/products/relatedProducts/${product._id}/${
              product.categories[0]
            }`
          ).then(components => this.setState({ components: components.data }));
        })
        .catch(err => console.log(err));
    }
  }

  next = () => {
    this.slider.slickNext();
  };

  previous = () => {
    this.slider.slickPrev();
  };

  handleStatusDesc = () => {
    this.setState(({ descMobile }) => ({ descMobile: !descMobile }));
  };

  handleStatusSpecs = () => {
    this.setState(({ specsMobile }) => ({ specsMobile: !specsMobile }));
  };

  handleInfo = info => {
    this.setState({ info });
  };

  render() {
    const { product, info, components } = this.state;
    const { apiUrl } = this.props;
    const settings = {
      centerMode: false,
      customPaging: function(i) {
        return (
          <div className="dotsSliderContainer">
            <img
              src={apiUrl + product.images[i]}
              alt=""
              className="dotsSlider"
            />
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      arrows: false,
      draggable: false
    };
    const relatedProducts =
      components[0] &&
      components
        .filter(e => e._id !== this.props.id)
        .map(component => {
          return (
            <div className="product" key={component._id}>
              <img
                src={`${this.props.apiUrl + component.images[0]}`}
                alt=""
                className="productImage"
              />

              <div className="productName">{component.partNumber}</div>
              <div className="productDescription">{component.name}</div>
              <Link
                to={`/products/${component._id}/${
                  component.categories[0] === "Tv Carts/Stands"
                    ? "Tv Carts-Stands"
                    : component.categories[0]
                }`}
                className="productLink"
              >
                view more →
              </Link>
            </div>
          );
        });
    return (
      <div className="singleProductContainer">
        <div className="singleProductPath">
          <Link
            to={`/products?${product && product._id && product.categories[0]}`}
            className="spCategoriePath"
          >
            {product && product._id && product.categories[0]}
          </Link>
          <img className="spCategoriePathArrow" src={arrowRight} alt="" />
          <div className="spCategoriePathName">
            {product && product._id && product.partNumber}
          </div>
        </div>
        <div className="singleProductPresentation">
          <div className="singleProductTitle">
            <div className="singleProductName">
              {product && product._id && product.partNumber}
            </div>
            <div className="singleProductSubname">
              {product &&
                product._id &&
                product.name[0].toUpperCase() + product.name.slice(1)}
            </div>
          </div>
          <div className="singleProductImages">
            <Slider {...settings} ref={c => (this.slider = c)}>
              {product &&
                product._id &&
                product.images.map(image => {
                  return (
                    <img
                      src={this.props.apiUrl + image}
                      alt=""
                      className="singleProdImage"
                      key={image}
                    />
                  );
                })}
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

        {this.props.width < 768 ? (
          <div className="singleProductInformationMobile">
            <div
              className="singleProductDescMobile"
              onClick={this.handleStatusDesc}
            >
              <div className="mobileTitleinfo">
                Description  
                <img src={arrowDown} alt="" className="arrowDownMobile" />
              </div>
              {this.state.descMobile ? (
                <div className="descDataMobile">
                  {product && product._id && product.description}
                </div>
              ) : null}
            </div>
            <div
              className="singleProductSpecsMobile"
              onClick={this.handleStatusSpecs}
            >
              <div className="mobileTitleinfo">
                Specs  
                <img src={arrowDownBlue} alt="" className="arrowDownMobile" />
              </div>
              {this.state.specsMobile ? (
                <div className="specsDataMobile">
                  {product && product._id && product.specs}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
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
              {info === "description"
                ? product && product._id && product.description
                : product && product._id && product.specs}
            </div>
          </div>
        )}
        {this.props.width < 768 ? (
          <div className="relatedProductsMobile">
            <div className="relatedProductsTitle"> Related Products</div>
            <AliceCarousel
              mouseDragEnabled
              items={relatedProducts}
              duration={200}
              infinite={false}
              buttonsDisabled
              responsive={{
                0: { items: 2 },
                1024: { items: 2 }
              }}
            />
          </div>
        ) : (
          <div className="relatedProducts">
            <div className="relatedProductsTitle"> Related Products</div>
            <div className="relatedProductsCards">{relatedProducts}</div>
          </div>
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
)(SingleProduct);
