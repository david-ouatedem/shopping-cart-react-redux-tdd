import {createSlice} from "@reduxjs/toolkit";
import {getProducts} from "./get-products.usecase.ts";
import {RootState} from "../../app/create-store.ts";
import {productsEntityAdapter} from "./product.entity.ts";


export const productsSlice = createSlice({
    name: "products",
    initialState: productsEntityAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            const products = action.payload
            productsEntityAdapter.addMany(state, products)
        })
    }
})

export const selectProducts = (state: RootState) =>
    productsEntityAdapter.getSelectors().selectAll(state)

