import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import HeroSection from "./components/heroSection/heroSection";
import HomeCategories from "./components/homeCategories/homeCategories";
import About from "../about/about";
import Contact from "../contacts/contact";
import Support from "../support/support";
import Products from "../products/products";
import SingleProduct from "../products/components/singleProduct/singleProduct";
class App extends React.Component {
  componentDidMount() {
    const { fetchConfiguration } = this.props;
    fetchConfiguration();
  }

  render() {
    return (
      <div className="App">
        <Route render={({ location }) => <Navbar page={location.pathname} />} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <HeroSection />
                <HomeCategories />
              </div>
            )}
          />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/contact" render={() => <Contact />} />
          <Route exact path="/support" render={() => <Support />} />
          <Route
            exact
            path="/products"
            render={({ location, history }) => (
              <Products search={location.search} history={history} />
            )}
          />
          <Route
            exact
            path="/products/:id/:categorie"
            render={({ match }) => (
              <SingleProduct
                id={match.params.id}
                categorie={match.params.categorie}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
