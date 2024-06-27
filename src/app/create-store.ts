import storage from "redux-persist/lib/storage";
import {
    Action,
    AsyncThunk,
    configureStore,
    isAsyncThunkAction, Middleware,
    ThunkDispatch,
    UnknownAction
} from "@reduxjs/toolkit";
import {ProductsGateway} from "../features/products/model/Products.gateway.ts";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {FakeProductsGatewayHttp} from "../features/products/infrastructure/fake-products-gateway-http.ts";
import {rootReducer} from "./root-reducer.ts";
import {persistReducer, persistStore} from 'redux-persist';
import {ProductsGatewayHttp} from "../features/products/infrastructure/productsGatewayHttp.ts";

export const EMPTY_ARGS = "EMPTY_ARGS" as const;

export type Dependencies = {
    productsGatewayHttp: ProductsGateway
}

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = (
    dependencies: Dependencies,
    preloadedState?: Partial<RootState>
) => {
    const actions: UnknownAction[] = []
    const logActionMiddleware: Middleware = () => (next) => (action) => {
        actions.push(action as UnknownAction);
        return next(action)
    }

    const store = configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies
                },
            }).prepend(
                logActionMiddleware
            )
        },
        preloadedState
    });

    return{
        ...store,
        getActions() {
            return actions
        }
    }
}

export const appStore = createStore({
    productsGatewayHttp: new ProductsGatewayHttp()
})
export const persist = persistStore(appStore)

export const creatTestStore = ({
                                   productsGatewayHttp = new FakeProductsGatewayHttp()
                               }: Partial<Dependencies> = {},
                               preloadedState?: Partial<RootState>
) => {
    const store = createStore(
        {
            productsGatewayHttp
        },
        preloadedState
    )
    return{
        ...store,
        getDispatchedUseCaseArgs(useCase: AsyncThunk<any, any, any>) {
            const pendingUseCaseAction = store
                .getActions()
                .find(a => a.type === useCase.pending.toString())

            if (!pendingUseCaseAction) return;

            if (!isAsyncThunkAction(pendingUseCaseAction)) return;

            return pendingUseCaseAction.meta.arg ?? EMPTY_ARGS
        }
    }
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector