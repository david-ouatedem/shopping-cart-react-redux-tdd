import {Product, productsEntityAdapter} from "../features/products/model/product.entity.ts";
import {RootState} from "./create-store.ts";
import {rootReducer} from "./root-reducer.ts";
import {createAction, createReducer, UnknownAction} from "@reduxjs/toolkit";

const action = (type:string):UnknownAction => {
    return {type}
}

const initialState = rootReducer(undefined, action(''));
const withProducts = createAction<Product[]>("with-products")

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(withProducts, (state, action) => {
        productsEntityAdapter.addMany(state.productsReducer, action.payload)
    })
})

export const stateBuilder = (baseState = initialState) => {
    return{
        withProducts(products: Product[]) {
            return stateBuilder(reducer(baseState, withProducts(products)))
        },
        build(): RootState {
            return baseState
        }
    }
}