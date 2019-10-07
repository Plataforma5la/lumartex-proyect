import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import HeroSection from "./components/heroSection/heroSection";
import HomeCategories from "./components/homeCategories/homeCategories";
import About from "./client/components/about/about";
import Contact from "./client/components/contacts/contact";
import Support from "./client/components/support/support";
import Products from "./client/components/products/products";
import SingleProduct from "./client/components/products/components/singleProduct/singleProduct";
import Upload from "./client/components/upload/upload";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    const globalVar = global && global;
    if (global.window) {
      this.setState({ width: globalVar.window.innerWidth });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const globalVar = global && global;
    if (prevState.width !== globalVar.window.innerWidth) {
      this.setState({ width: globalVar.window.innerWidth });
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          render={({ location, history }) => (
            <Navbar
              page={location.pathname}
              history={history}
              width={this.state.width}
            />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <HeroSection width={this.state.width} />
                <HomeCategories width={this.state.width} />
              </div>
            )}
          />
          <Route
            exact
            path="/about"
            render={() => <About width={this.state.width} />}
          />
          <Route
            exact
            path="/contact"
            render={() => <Contact width={this.state.width} />}
          />
          <Route
            exact
            path="/support"
            render={() => <Support width={this.state.width} />}
          />
          <Route
            exact
            path="/upload"
            render={() => <Upload width={this.state.width} />}
          />
          <Route
            exact
            path="/products"
            render={({ location, history }) => (
              <Products
                search={location.search}
                history={history}
                width={this.state.width}
              />
            )}
          />
          <Route
            exact
            path="/products/:id/:categorie"
            render={({ match }) => (
              <SingleProduct
                id={match.params.id}
                categorie={match.params.categorie}
                width={this.state.width}
              />
            )}
          />
        </Switch>
        <Footer width={this.state.width} />
      </div>
    );
  }
}

export default App;
