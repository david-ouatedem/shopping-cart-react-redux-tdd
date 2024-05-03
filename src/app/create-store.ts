import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice.ts";


const createStore = () => {
    const store = configureStore({
        reducer: {
            products: productReducer
        }
    })
    return{
        ...store
    }
}

export const creatTestStore = () => createStore()

export type AppStore = ReturnType<typeof createStore>