import {Action, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {ProductsGateway} from "../features/products/model/Products.gateway.ts";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {FakeProductsGatewayHttp} from "../features/products/infrastructure/fake-products-gateway-http.ts";
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
                                   productsGatewayHttp = new FakeProductsGatewayHttp()
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