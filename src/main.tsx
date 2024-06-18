import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Provider } from "react-redux";
import { createStore } from "./app/create-store.ts";
import {ProductsGatewayHttp} from "./features/products/productsGatewayHttp.ts";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);
const store = createStore({
    productsGatewayHttp: new ProductsGatewayHttp()
})

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router(store)} />
    </Provider>
  </React.StrictMode>
);
