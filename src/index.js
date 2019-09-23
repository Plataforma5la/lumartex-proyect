import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import "./index.css";
import App from "./app/AppContainer";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import configureStore from "./store";

let configManagerStore = configureStore();

ReactDOM.render(
  <Provider store={configManagerStore}>
    <StaticRouter>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StaticRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
