import {Action, configureStore, createListenerMiddleware, ThunkDispatch} from "@reduxjs/toolkit";
import {ProductsGateway} from "../features/products/Products.gateway.ts";
import {ProductsGatewayHttp} from "../features/products/productsGatewayHttp.ts";
import {productsSlice} from "../features/products/products.slice.ts";

export type Dependencies = {
    productsGatewayHttp: ProductsGateway
}
export const listenerMiddleware = createListenerMiddleware();

const rootReducer = productsSlice.reducer
export const createStore = (
    dependencies: Dependencies
) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies
                }
            }).prepend(listenerMiddleware.middleware)
        }
    })
    return{
        ...store
    }
}

export const creatTestStore = (
    initialState: RootState,
    productsGatewayHttp =  new ProductsGatewayHttp()
) => {
    const store = createStore({
        productsGatewayHttp
    })
    store.getState = () => initialState;
    return store;
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>