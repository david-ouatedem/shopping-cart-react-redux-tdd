import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home.tsx";
import { Products } from "./pages/products/Products.tsx";
import { Cart } from "./pages/cart/Cart.tsx";

export const router = createBrowserRouter([
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
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);
