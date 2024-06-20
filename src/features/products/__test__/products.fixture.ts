import {AppStore, creatTestStore} from "../../../app/create-store.ts";
import {ProductEntity} from "../model/product.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";
import {getProducts} from "../usecase/get-all-products.usecase.ts";
import {expect} from "vitest";

export const createProductsFixture = () => {
    let store: AppStore;

    return {
        givenExampleProduct (products: ProductEntity[]) {
            const givenState = stateBuilder()
                .withProducts(products).build()
            store = creatTestStore({},givenState)
        },
        async whenGettingProducts () {
            await store.dispatch(getProducts())
        },
        thenProductShouldBe(expectedProduct:ProductEntity) {
            const expectedState = stateBuilder()
                .withProducts([expectedProduct]).build()
            expect(store.getState()).toEqual(expectedState);
        }
    }
}

export type ProductsFixture = ReturnType<typeof createProductsFixture>