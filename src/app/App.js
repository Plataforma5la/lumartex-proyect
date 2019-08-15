import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import HeroSection from "./components/heroSection/heroSection";
import HomeCategories from "./components/homeCategories/homeCategories";
import About from "./about/about";
class App extends React.Component {
  componentDidMount() {
    const { fetchConfiguration } = this.props;
    fetchConfiguration();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <HeroSection />
                <HomeCategories />
              </div>
            )}
          />
          <Route exact path="/about" render={() => <About />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
