import React from "react";
import "./dropdown.css";

export default class Dropdown extends React.Component {
  render() {
    const { products, statusMenu, handleClickProduct } = this.props;
    return (
      <div className="dropdownContainer">
        {products.name.length && statusMenu ? (
          <div>
            <div className="dropdownSection">Name</div>
            {products.name.map(produ => (
              <div
                className="dropdownProduct"
                onClick={e =>
                  handleClickProduct(
                    e,
                    `/products/${produ._id}/${
                      produ._source.categories[0] === "Tv Carts/Stands"
                        ? "Tv Carts-Stands"
                        : produ._source.categories[0]
                    }`
                  )
                }
                key={produ._id}
              >
                {produ._source.name}
              </div>
            ))}
          </div>
        ) : null}

        {products.partNumber.length && statusMenu ? (
          <div>
            <div className="dropdownSection">Part Number</div>
            {products.partNumber.map(prod => (
              <div
                className="dropdownProduct"
                key={prod._id}
                onClick={e =>
                  handleClickProduct(
                    e,
                    `/products/${prod._id}/${
                      prod._source.categories[0] === "Tv Carts/Stands"
                        ? "Tv Carts-Stands"
                        : prod._source.categories[0]
                    }`
                  )
                }
              >
                {prod._source.partNumber}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
