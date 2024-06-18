import {Action, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {ProductsGateway} from "../features/products/Products.gateway.ts";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {FakeProductsGateway} from "../features/products/fakeProductsGateway.ts";
import {rootReducer} from "./root-reducer.ts";

export type Dependencies = {
    productsGatewayHttp: ProductsGateway
}


export const createStore = (
    dependencies: Dependencies,
    preloadedState?: Partial<RootState>
) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: dependencies
            },
        })
    },
    preloadedState
});


export const creatTestStore = ({
                                   productsGatewayHttp = new FakeProductsGateway()
                               }: Partial<Dependencies> = {}, preloadedState?: Partial<RootState>) => createStore(
    {
        productsGatewayHttp
    },
    preloadedState
)

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector