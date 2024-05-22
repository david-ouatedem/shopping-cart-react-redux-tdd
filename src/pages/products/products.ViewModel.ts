import {RootState} from "../../app/create-store.ts";
import {selectProducts} from "../../features/products/products.slice.ts";

export enum HomeViewModel {
    NO_PRODUCTS= "NO_PRODUCTS",
    EMPTY_PRODUCTS= "EMPTY_PRODUCTS",
    PRODUCTS_EXIST= "PRODUCTS_EXIST"
}
export const selectProductsViewModel = (rootState: RootState) => {
    const products = selectProducts(rootState);
    console.log(products)
    if (!products) {
        return {
            type: HomeViewModel.NO_PRODUCTS
        }
    }

    if (products.length === 0) {
        return {
            type: HomeViewModel.EMPTY_PRODUCTS,
            info: "there are no products available"
        }
    }

    return {
        type: HomeViewModel.PRODUCTS_EXIST,
        products
    }
}