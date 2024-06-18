import {AppStore} from "../../app/create-store.ts";
import {LoaderFunction} from "react-router-dom";
import {getProducts} from "../../features/products/get-products.usecase.ts";

export const productsLoader = (store:AppStore): LoaderFunction => () => {
    store.dispatch(getProducts())
    return null
}