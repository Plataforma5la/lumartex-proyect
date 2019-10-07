import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./gridProducts.css";

import arrow from "./assets/arrow.svg";
class GridProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualIndex: 1,
      totalIndex: 0,
      productsToShow: []
    };
  }

  componentDidMount() {
    const { actualIndex } = this.state;
    this.setState({ totalIndex: Math.ceil(this.props.products.length / 9) });
    let initIndex = 0;
    if (actualIndex !== 1) {
      initIndex = actualIndex * 9 - 9;
    }
    this.setState({
      productsToShow: this.props.products.slice(initIndex, actualIndex * 9)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { actualIndex, totalIndex } = this.state;
    let numOfProducts = this.props.width < 768 ? 8 : 9;
    let initIndex = 0;
    if (actualIndex !== 1) {
      initIndex = actualIndex * numOfProducts - numOfProducts;
    }
    if (prevProps.products.length !== this.props.products.length) {
      this.setState({
        totalIndex: Math.ceil(this.props.products.length / numOfProducts),
        productsToShow: this.props.products.slice(
          initIndex,
          actualIndex * numOfProducts
        )
      });
    }
    if (
      prevState.totalIndex !== totalIndex ||
      prevState.actualIndex !== actualIndex
    ) {
      this.setState({
        productsToShow: this.props.products.slice(
          initIndex,
          actualIndex * numOfProducts
        )
      });
    }
  }

  showIndexs = total => {
    const result = [];
    for (let i = 1; i <= total; i++) {
      result.push(
        <div
          className={
            this.state.actualIndex === i ? "activeIndex" : "disableIndex"
          }
          onClick={e => this.handleClick(e, i)}
          key={i}
        >
          {i}
        </div>
      );
    }
    return result;
  };

  prevIndex = () => {
    if (this.state.actualIndex > 1) {
      this.setState(({ actualIndex }) => ({ actualIndex: actualIndex - 1 }));
    }
  };
  nextIndex = () => {
    if (this.state.actualIndex !== this.state.totalIndex) {
      this.setState(({ actualIndex }) => ({ actualIndex: actualIndex + 1 }));
    }
  };
  handleClick = (e, actualIndex) => {
    e.preventDefault();
    this.setState({ actualIndex });
  };

  render() {
    const { products } = this.props;
    const { productsToShow, totalIndex } = this.state;
    return (
      <div>
        <div className="gridProductsContainer">
          {products &&
            productsToShow &&
            productsToShow.map(product => (
              <div className="product" key={product._id}>
                <img
                  src={`${this.props.apiUrl + product.images[0]}`}
                  alt=""
                  className="productImage"
                />

                <div className="productName">{product.partNumber}</div>
                <div className="productDescription">{product.name}</div>
                <Link
                  to={`/products/${product._id}/${
                    product.categories[0] === "Tv Carts/Stands"
                      ? "Tv Carts-Stands"
                      : product.categories[0]
                  }`}
                  className="productLink"
                >
                  view more →
                </Link>
              </div>
            ))}
        </div>
        {totalIndex > 1 ? (
          <div className="indexContainer">
            <img
              src={arrow}
              alt=""
              className="arrowLeftIndex"
              onClick={this.prevIndex}
            />
            {totalIndex ? this.showIndexs(totalIndex) : null}
            <img
              src={arrow}
              alt=""
              className="arrowRightIndex"
              onClick={this.nextIndex}
            />
          </div>
        ) : null}
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
)(GridProducts);
