import {combineReducers} from "@reduxjs/toolkit";
import {productsSlice} from "../features/products/products.slice.ts";

export const rootReducer = combineReducers({
    productsReducer:  productsSlice.reducer
})

