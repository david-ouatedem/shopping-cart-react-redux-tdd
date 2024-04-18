import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Provider } from "react-redux";
import { store } from "./app/store";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
