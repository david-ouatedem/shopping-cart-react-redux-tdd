import {createEntityAdapter} from "@reduxjs/toolkit";
import {Product} from "./product.model.ts";

export const productsEntityAdapter = createEntityAdapter<Product>();