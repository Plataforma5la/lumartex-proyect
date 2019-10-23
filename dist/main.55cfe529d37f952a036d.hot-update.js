exports.id = "main";
exports.modules = {

/***/ "./src/components/navbar/navbar.js":
/*!*****************************************!*\
  !*** ./src/components/navbar/navbar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _navbar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar.css */ \"./src/components/navbar/navbar.css\");\n/* harmony import */ var _navbar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_navbar_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dropdown/dropdown */ \"./src/components/navbar/components/dropdown/dropdown.js\");\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/logo.svg */ \"./src/components/navbar/assets/logo.svg\");\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_logo_svg__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/menu.svg */ \"./src/components/navbar/assets/menu.svg\");\n/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/close.svg */ \"./src/components/navbar/assets/close.svg\");\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_close_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_search_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/search.svg */ \"./src/components/navbar/assets/search.svg\");\n/* harmony import */ var _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_search_svg__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/right-arrow.svg */ \"./src/components/navbar/assets/right-arrow.svg\");\n/* harmony import */ var _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/prev.svg */ \"./src/components/navbar/assets/prev.svg\");\n/* harmony import */ var _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_prev_svg__WEBPACK_IMPORTED_MODULE_11__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/navbar/navbar.js\";\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass Navbar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.handleClick = (e, path) => {\n      e.preventDefault();\n\n      if (this.state.statusMenu) {\n        this.setState({\n          statusMenu: false\n        });\n      }\n    };\n\n    this.handleFocus = e => {\n      e.preventDefault();\n      if (this.state.inputValue) this.setState({\n        statusMenu: true\n      });\n    };\n\n    this.state = {\n      openMenu: false,\n      inputValue: \"\",\n      products: {\n        name: [],\n        partNumber: []\n      },\n      openSearch: false,\n      statusMenu: false\n    };\n    this.handleMenu = this.handleMenu.bind(this);\n    this.handleChange = this.handleChange.bind(this);\n    this.handleSearch = this.handleSearch.bind(this);\n  }\n\n  componentDidMount() {\n    if (this.props.width >= 768) this.setState({\n      openMenu: true\n    });\n  }\n\n  componentDidUpdate(prevProps) {\n    if (prevProps.page !== this.props.page) {\n      this.setState({\n        inputValue: \"\",\n        products: {\n          name: [],\n          partNumber: []\n        }\n      });\n    }\n\n    if (prevProps.page !== this.props.page && this.props.width <= 768) {\n      this.setState({\n        openMenu: false\n      });\n    }\n\n    if (prevProps.width !== this.props.width && this.props.width > 767) {\n      this.setState({\n        openMenu: true\n      });\n    }\n  }\n\n  handleSearch(e) {\n    e.preventDefault();\n    this.setState(({\n      openSearch\n    }) => ({\n      openSearch: !openSearch,\n      openMenu: false\n    }));\n  }\n\n  handleMenu(e) {\n    e.preventDefault();\n    this.setState(({\n      openMenu\n    }) => ({\n      openMenu: !openMenu\n    }));\n  }\n\n  handleChange(e) {\n    e.preventDefault();\n    this.setState({\n      inputValue: e.target.value\n    });\n    if (e.target.value === \"\") this.setState({\n      products: {\n        name: [],\n        partNumber: []\n      },\n      statusMenu: false\n    });else {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(this.props.apiUrl, \"/api/products?q=\").concat(e.target.value)).then(res => res.data).then(products => {\n        this.setState({\n          products,\n          statusMenu: true\n        });\n      });\n    }\n  }\n\n  render() {\n    const width = this.props.width;\n    const _this$state = this.state,\n          openMenu = _this$state.openMenu,\n          products = _this$state.products,\n          openSearch = _this$state.openSearch,\n          inputValue = _this$state.inputValue,\n          statusMenu = _this$state.statusMenu;\n    const page = this.props.page;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 109\n      },\n      __self: this\n    }, statusMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dropdownAbsolute\",\n      onClick: this.handleClick,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 111\n      },\n      __self: this\n    }) : null, openSearch ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/\",\n      id: \"navbarHome\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 114\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6___default.a,\n      alt: \"logo\",\n      className: \"navbarLogo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 115\n      },\n      __self: this\n    })), openMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSections\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 119\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page === \"/about\" ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/about\",\n      id: \"navbarAbout\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 120\n      },\n      __self: this\n    }, \"about us\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 128\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page.includes(\"/products\") ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/products\",\n      id: \"navbarProducts\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 130\n      },\n      __self: this\n    }, \"products\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 140\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page === \"/contact\" ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/contact\",\n      id: \"navbarContact\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 152\n      },\n      __self: this\n    }, \"contact\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 160\n      },\n      __self: this\n    }))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSearch\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 164\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dividerInput\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 165\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"search\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 166\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 167\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\",\n      value: inputValue,\n      onChange: this.handleChange,\n      onFocus: this.handleFocus,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 168\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      products: products,\n      statusMenu: statusMenu,\n      handleClickProduct: this.handleClickProduct,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 174\n      },\n      __self: this\n    }))), width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 182\n      },\n      __self: this\n    }, openSearch ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSearchMobile\",\n      onScroll: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 184\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dividerInputMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 185\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11___default.a,\n      alt: \"search\",\n      className: \"prev\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 186\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"searchActive\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 192\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\",\n      value: inputValue,\n      onChange: this.handleChange,\n      autoFocus: true,\n      onFocus: this.handleFocus,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 198\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 207\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"searchMobile\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 208\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: openMenu ? _assets_close_svg__WEBPACK_IMPORTED_MODULE_8___default.a : _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default.a,\n      alt: openMenu ? \"close\" : \"menu\",\n      className: openMenu ? \"close\" : \"menu\",\n      onClick: this.handleMenu,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 214\n      },\n      __self: this\n    }))) : null);\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(mapStateToProps, null)(Navbar));\n\n//# sourceURL=webpack:///./src/components/navbar/navbar.js?");

/***/ })

};