import {RootState} from "../../../app/create-store.ts";
import {selectProducts} from "../../../features/products/slice/products.slice.ts";
import {ProductEntity} from "../../../features/products/model/product.entity.ts";

export enum HomeViewModel {
    EMPTY_PRODUCTS= "EMPTY_PRODUCTS",
    PRODUCTS_EXIST= "PRODUCTS_EXIST"
}
export type HomeViewModelType =
    {
        type: HomeViewModel.EMPTY_PRODUCTS,
        info: string
    } |
    {
        type: HomeViewModel.PRODUCTS_EXIST,
        products: ProductEntity[]
    }
export const selectProductsViewModel = (rootState: RootState): HomeViewModelType => {
    const products = selectProducts(rootState);

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