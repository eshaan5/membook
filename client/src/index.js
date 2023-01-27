import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux"; // keep track of store
import store from './store'

import "./index.css";


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

// proxy is used to avoid CORS error in package.json
