exports.id = "main";
exports.modules = {

/***/ "./src/client/components/products/components/singleProduct/singleProduct.js":
/*!**********************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/singleProduct.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-slick */ \"react-slick\");\n/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-alice-carousel */ \"react-alice-carousel\");\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! slick-carousel/slick/slick.css */ \"./node_modules/slick-carousel/slick/slick.css\");\n/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slick-carousel/slick/slick-theme.css */ \"./node_modules/slick-carousel/slick/slick-theme.css\");\n/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _singleProduct_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./singleProduct.css */ \"./src/client/components/products/components/singleProduct/singleProduct.css\");\n/* harmony import */ var _singleProduct_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_singleProduct_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/arrowRight.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowRight.svg\");\n/* harmony import */ var _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/arrowRightSlider.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowRightSlider.svg\");\n/* harmony import */ var _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/arrowDown.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowDown.svg\");\n/* harmony import */ var _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/arrowDownBlue.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowDownBlue.svg\");\n/* harmony import */ var _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _assets_image_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./assets/image.png */ \"./src/client/components/products/components/singleProduct/assets/image.png\");\n/* harmony import */ var _assets_image_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_image_png__WEBPACK_IMPORTED_MODULE_13__);\nvar _jsxFileName = \"/Users/plataforma5/Plataforma5/lumartex-proyect/src/client/components/products/components/singleProduct/singleProduct.js\";\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass SingleProduct extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.next = () => {\n      this.slider.slickNext();\n    };\n\n    this.previous = () => {\n      this.slider.slickPrev();\n    };\n\n    this.handleStatusDesc = () => {\n      this.setState(({\n        descMobile\n      }) => ({\n        descMobile: !descMobile\n      }));\n    };\n\n    this.handleStatusSpecs = () => {\n      this.setState(({\n        specsMobile\n      }) => ({\n        specsMobile: !specsMobile\n      }));\n    };\n\n    this.handleInfo = info => {\n      this.setState({\n        info\n      });\n    };\n\n    this.state = {\n      product: {},\n      info: \"description\",\n      descMobile: false,\n      specsMobile: false\n    };\n  }\n\n  componentDidMount() {\n    const apiUrl = this.props.apiUrl;\n\n    if (apiUrl) {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/\").concat(this.props.id)).then(res => res.data[0]).then(product => this.setState({\n        product\n      })).catch(err => console.log(err));\n    }\n  }\n\n  componentDidUpdate(prevProps) {\n    const apiUrl = this.props.apiUrl;\n\n    if (prevProps.id !== this.props.id || prevProps.apiUrl !== apiUrl) {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/\").concat(this.props.id)).then(res => res.data[0]).then(product => this.setState({\n        product\n      }));\n    }\n  }\n\n  render() {\n    const _this$state = this.state,\n          product = _this$state.product,\n          info = _this$state.info;\n    const _this$props = this.props,\n          categorie = _this$props.categorie,\n          apiUrl = _this$props.apiUrl;\n    const settings = {\n      centerMode: false,\n      customPaging: function (i) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"dotsSliderContainer\",\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 75\n          },\n          __self: this\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: apiUrl + product.images[i],\n          alt: \"\",\n          className: \"dotsSlider\",\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 76\n          },\n          __self: this\n        }));\n      },\n      dots: true,\n      dotsClass: \"slick-dots slick-thumb\",\n      infinite: true,\n      slidesToShow: 1,\n      speed: 500,\n      arrows: false,\n      draggable: false\n    };\n    const components = [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"product\",\n      key: 1,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 93\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_image_png__WEBPACK_IMPORTED_MODULE_13___default.a,\n      alt: \"\",\n      className: \"productImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 94\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 95\n      },\n      __self: this\n    }, product.partNumber), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productDescription\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 96\n      },\n      __self: this\n    }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products/\".concat(product._id, \"/\").concat(categorie),\n      className: \"productLink\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 97\n      },\n      __self: this\n    }, \"view more \\u2192\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"product\",\n      key: 2,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 104\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_image_png__WEBPACK_IMPORTED_MODULE_13___default.a,\n      alt: \"\",\n      className: \"productImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 105\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 106\n      },\n      __self: this\n    }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productDescription\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 107\n      },\n      __self: this\n    }, \"Laptop stand and monitor mounts\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products/\".concat(product._id, \"/\").concat(categorie),\n      className: \"productLink\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 110\n      },\n      __self: this\n    }, \"view more \\u2192\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"product\",\n      key: 3,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 117\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_image_png__WEBPACK_IMPORTED_MODULE_13___default.a,\n      alt: \"\",\n      className: \"productImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 118\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 119\n      },\n      __self: this\n    }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productDescription\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 120\n      },\n      __self: this\n    }, \"Laptop stand and monitor mounts\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products/\".concat(product._id, \"/\").concat(categorie),\n      className: \"productLink\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 123\n      },\n      __self: this\n    }, \"view more \\u2192\"))];\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 132\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductPath\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 133\n      },\n      __self: this\n    }, console.log(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products?\".concat(product && product.categories[0]),\n      className: \"spCategoriePath\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 135\n      },\n      __self: this\n    }, product && product.categories[0]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"spCategoriePathArrow\",\n      src: _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 141\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"spCategoriePathName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 142\n      },\n      __self: this\n    }, product.partNumber)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductPresentation\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 144\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 145\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 146\n      },\n      __self: this\n    }, product.partNumber), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductSubname\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 147\n      },\n      __self: this\n    }, product.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductImages\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 149\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_3___default.a, Object.assign({}, settings, {\n      ref: c => this.slider = c,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 150\n      },\n      __self: this\n    }), product.images && product.images.map(image => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: this.props.apiUrl + image,\n        alt: \"\",\n        className: \"singleProdImage\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 154\n        },\n        __self: this\n      });\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"arrowsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 162\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"\",\n      className: \"arrowLeftSlider\",\n      onClick: this.previous,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 163\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"\",\n      className: \"arrowRightSlider\",\n      onClick: this.next,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 169\n      },\n      __self: this\n    })))), this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInformationMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 180\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductDescMobile\",\n      onClick: this.handleStatusDesc,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 181\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"mobileTitleinfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 185\n      },\n      __self: this\n    }, \"Description \\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11___default.a,\n      alt: \"\",\n      className: \"arrowDownMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 187\n      },\n      __self: this\n    })), this.state.descMobile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"descDataMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 190\n      },\n      __self: this\n    }, product.description) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductSpecsMobile\",\n      onClick: this.handleStatusSpecs,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 193\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"mobileTitleinfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 197\n      },\n      __self: this\n    }, \"Specs \\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12___default.a,\n      alt: \"\",\n      className: \"arrowDownMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 199\n      },\n      __self: this\n    })), this.state.specsMobile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"specsDataMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 202\n      },\n      __self: this\n    }, product.specs) : null)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInformation\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 207\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInfoTitles\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 208\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: info === \"description\" ? \"singleProductInfoActive\" : \"singleProductInfoDesactive\",\n      onClick: () => this.handleInfo(\"description\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 209\n      },\n      __self: this\n    }, \"description\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: info === \"specs\" ? \"singleProductInfoActive\" : \"singleProductInfoDesactive\",\n      onClick: () => this.handleInfo(\"specs\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 219\n      },\n      __self: this\n    }, \"specs\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInfoData\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 230\n      },\n      __self: this\n    }, info === \"description\" ? product.description : product.specs)), this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 236\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 237\n      },\n      __self: this\n    }, \" Related Products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      mouseDragEnabled: true,\n      items: components,\n      duration: 200,\n      infinite: false,\n      buttonsDisabled: true,\n      responsive: {\n        0: {\n          items: 2\n        },\n        1024: {\n          items: 2\n        }\n      },\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 238\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProducts\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 251\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 252\n      },\n      __self: this\n    }, \" Related Products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsCards\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 253\n      },\n      __self: this\n    }, components)));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__[\"connect\"])(mapStateToProps, null)(SingleProduct));\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/singleProduct.js?");

/***/ })

};