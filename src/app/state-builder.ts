import {ProductEntity, productsEntityAdapter} from "../features/products/model/product.entity.ts";
import {RootState} from "./create-store.ts";
import {rootReducer} from "./root-reducer.ts";
import {createAction, createReducer, UnknownAction} from "@reduxjs/toolkit";
import {cartEntityAdapter, CartItemEntity} from "../features/cart/model/cart.entity.ts";

const action = (type:string):UnknownAction => {
    return {type}
}

const initialState = rootReducer(undefined, action(''));
const withProducts = createAction<ProductEntity[]>("with-products")
const withCartItems = createAction<CartItemEntity[]>("with-cart-items")

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(withProducts, (state, action) => {
        productsEntityAdapter.addMany(state.productsReducer, action.payload)
    })
    builder.addCase(withCartItems, (state, action) => {
        cartEntityAdapter.addMany(state.cartReducer, action.payload)
    })
})

export const stateBuilder = (baseState = initialState) => {
    return{
        withProducts(products: ProductEntity[]) {
            return stateBuilder(reducer(baseState, withProducts(products)))
        },
        withCartItems(cartItems: CartItemEntity[]) {
            return stateBuilder(reducer(baseState, withCartItems(cartItems)))
        },
        build(): RootState {
            return baseState
        }
    }
}