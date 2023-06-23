import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import cartReducer from "../src/ReduxCart";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { ProSidebarProvider } from "react-pro-sidebar";
// const store = configureStore({
//   reducer: {
//     global: globalReducer,
//     [api.reducerPath]: api.reducer,
//     cart: cartReducer,
//     user: Store,
//   },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// setupListeners(store.dispatch);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
