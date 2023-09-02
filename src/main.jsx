import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import {
  RouterProvider,
  Router,
} from "@tanstack/react-router";
import routeTree from "./routes/root";
// Create the router using your route tree
const router = new Router({ routeTree });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
