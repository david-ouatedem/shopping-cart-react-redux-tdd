import {combineReducers} from "@reduxjs/toolkit";
import {productsSlice} from "../features/products/slice/products.slice.ts";
import {cartSlice} from "../features/cart/slice/cart.slice.ts";

export const rootReducer = combineReducers({
    productsReducer:  productsSlice.reducer,
    cartReducer: cartSlice.reducer
})

