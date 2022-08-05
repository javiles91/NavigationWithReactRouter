import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducres from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducres,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
