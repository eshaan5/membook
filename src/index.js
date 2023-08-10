import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Provider } from "react-redux"; // keep track of store
import store from './store'

import "./index.css";


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// proxy is used to avoid CORS error in package.json
