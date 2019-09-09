import React from "react";

import "./singleProduct.css";
import Axios from "axios";

import arrowRight from "./assets/arrowRight.svg";
import image from "./assets/image.png";

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      info: "description"
    };
    this.handleInfo = this.handleInfo.bind(this);
  }

  componentDidMount() {
    Axios.get(`http://localhost:8080/api/products/${this.props.id}`)
      .then(res => res.data[0])
      .then(product => this.setState({ product }));
  }

  componentDidUpdate(prevProps) {
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
    const { product, info, relatedProducts } = this.state;
    const { categorie } = this.props;
    return (
      <div className="singleProductContainer">
        <div className="singleProductPath">
          <div className="spCategoriePath">{categorie}</div>
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
            <img src={image} alt="" className="singleProdImage" />
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
            {relatedProducts &&
              relatedProducts.map(relProd => {
                return <div> </div>;
              })}
          </div>
        </div>
      </div>
    );
  }
}
