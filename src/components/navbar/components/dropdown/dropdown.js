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
                // onClick={e => handleClickProduct(e)}
                to={`/products/${produ._id}/${
                  produ._source.categories[0] === "Tv Carts/Stands"
                    ? "Tv Carts-Stands"
                    : produ._source.categories[0]
                }`}
                key={produ._id}
              >
                {produ._source.name}
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
                // onClick={e => handleClickProduct(e)}
                to={`/products/${prod._id}/${
                  prod._source.categories[0] === "Tv Carts/Stands"
                    ? "Tv Carts-Stands"
                    : prod._source.categories[0]
                }`}
                key={prod._id}
              >
                {prod._source.partNumber}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
