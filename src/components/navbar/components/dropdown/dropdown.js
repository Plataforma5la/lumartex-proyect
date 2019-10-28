import React from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";

export default class Dropdown extends React.Component {
  render() {
    const { products, statusMenu } = this.props;
    return (
      <div className="dropdownContainer">
        {products.name.length && statusMenu ? (
          <div>
            <div className="dropdownSection">Name</div>
            {products.name.map(produ => (
              <Link
                className="dropdownProduct"
                to={`/products/${produ._id}/${
                  produ.categories[0] === "Tv Carts/Stands"
                    ? "Tv Carts-Stands"
                    : produ.categories[0]
                }`}
                key={produ._id}
              >
                {produ.name}
              </Link>
            ))}
          </div>
        ) : null}

        {products.partNumber.length && statusMenu ? (
          <div>
            <div className="dropdownSection">Part Number</div>
            {products.partNumber.map(prod => (
              <Link
                className="dropdownProduct"
                to={`/products/${prod._id}/${
                  prod.categories[0] === "Tv Carts/Stands"
                    ? "Tv Carts-Stands"
                    : prod.categories[0]
                }`}
                key={prod._id}
              >
                {prod.partNumber}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
