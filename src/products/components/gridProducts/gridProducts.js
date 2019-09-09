import React from "react";
import { Link } from "react-router-dom";
import "./gridProducts.css";

import image from "./assets/lala.png";
export default class GridProducts extends React.Component {
  render() {
    const { products, search } = this.props;
    console.log(search);
    return (
      <div className="gridProductsContainer">
        {products &&
          products.map(product => (
            <div className="product" key={product._id}>
              <img src={image} alt="" className="productImage" />
              <div className="productName">{product.name}</div>
              <div className="productDescription">
                Laptop stand and monitor mounts
              </div>
              <Link
                to={`/products/${product._id}/${search.slice(1).split(";")[0]}`}
                className="productLink"
              >
                view more →
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
