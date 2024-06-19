import {creatTestStore} from "../../../app/create-store.ts";
import {ProductEntity} from "../model/product.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";
import {getProducts} from "../usecase/get-all-products.usecase.ts";
import {expect} from "vitest";
import {FakeProductsGatewayHttp} from "../infrastructure/fake-products-gateway-http.ts";

export const createProductsFixture = () => {
    const productsGatewayHttp = new FakeProductsGatewayHttp()
    const store = creatTestStore({
        productsGatewayHttp
    })

    return {
        givenExampleProduct (products: ProductEntity[]) {
            productsGatewayHttp.returnedResponse = {
                status: true,
                products: products
            }
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