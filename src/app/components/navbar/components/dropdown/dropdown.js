import React from "react";

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
              <div className="dropdownProduct" key={produ._id}>
                {produ._source.name}
              </div>
            ))}
          </div>
        ) : null}

        {products.partNumber.length ? (
          <div>
            <div className="dropdownSection">Part Number</div>
            {products.partNumber.map(prod => (
              <div className="dropdownProduct" key={prod._id}>
                {prod._source.partNumber}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
