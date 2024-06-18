import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home.tsx";
import { Products } from "./pages/products/index/Products.tsx";
import { Cart } from "./pages/cart/Cart.tsx";
import {productsLoader} from "./pages/products/view-model/products-loader.ts";
import {AppStore} from "./app/create-store.ts";

export const router = (store: AppStore) => createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader(store)
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);
