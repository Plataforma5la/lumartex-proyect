import React from "react";
import { Link } from "react-router-dom";
import "./dropdown.css";

export default class Dropdown extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div className="dropdownContainer">
        {products.name.length ? (
          <div>
            <div className="dropdownSection">Name</div>
            {products.name.map(produ => (
              <Link
                className="dropdownProduct"
                key={produ._id}
                to={`/products/${produ._id}/${produ._source.categories[0]}`}
              >
                {produ._source.name}
              </Link>
            ))}
          </div>
        ) : null}

        {products.partNumber.length ? (
          <div>
            <div className="dropdownSection">Part Number</div>
            {products.partNumber.map(prod => (
              <Link
                className="dropdownProduct"
                key={prod._id}
                to={`/products/${prod._id}/${prod._source.categories[0]}`}
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
