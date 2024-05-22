import {Action, configureStore, createListenerMiddleware, ThunkDispatch} from "@reduxjs/toolkit";
import {ProductsGateway} from "../features/products/Products.gateway.ts";
import {productsSlice} from "../features/products/products.slice.ts";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type Dependencies = {
    productsGatewayHttp: ProductsGateway
}
export const listenerMiddleware = createListenerMiddleware();

const rootReducer = productsSlice.reducer

export const createStore = (
    dependencies: Dependencies
) => configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies
                }
            })
        }
    });




export const creatTestStore = ({productsGatewayHttp}:Partial<Dependencies>) => createStore(
    {
        productsGatewayHttp
    }
)

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector