import {describe, expect, test} from "vitest";
import {HomeViewModel, selectProductsViewModel} from "../view-model/products.ViewModel.ts";
import {getProducts} from "../../../features/products/usecase/get-all-products.usecase.ts";
import {Product} from "../../../features/products/model/product.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";
import {creatTestStore} from "../../../app/create-store.ts";
import {FakeProductsGatewayHttp} from "../../../features/products/infrastructure/fake-products-gateway-http.ts";

describe("products view model", () => {

    test("can fetch products", async () => {
        const productsGatewayHttp = new FakeProductsGatewayHttp()
        productsGatewayHttp.returnedResponse = {
            status: false,
            products: []
        }
        const store = creatTestStore()

        const response = await store.dispatch(getProducts())

        expect(responses.status).toEqual(true)
    })

    test("products are empty", async () => {
        const productsGatewayHttp = new FakeProductsGatewayHttp()
        productsGatewayHttp.returnedResponse = {
            status: true,
            products: []
        }
        const initialState = stateBuilder().withProducts([]).build()
        const store = creatTestStore({
            productsGatewayHttp
        },initialState)

        await store.dispatch(getProducts())

        const productsViewModel = selectProductsViewModel(store.getState())

        expect(productsViewModel).toEqual({
            type: HomeViewModel.EMPTY_PRODUCTS,
            info: "there are no products available"
        })
    })

    test("there are products", async () => {
        const products:Product[] = [
            {
            id: "300",
            description: "Look cool while blocking out the rest of the world.",
            imageAlt: "Cool looking headphones in gray and black",
            name: "Headphones",
            price: 34.99,
            imageCredit: "\"Headphones in Black and White\" by Image Catalog is marked under CC0 1.0.",
            imageURL: "https://live.staticflickr.com/5763/22921682035_334b6161c9_b.jpg"
        }]
        const initialState = stateBuilder().withProducts(products).build()
        const store = creatTestStore({},initialState)

        await store.dispatch(getProducts())

        const productsViewModel = selectProductsViewModel(store.getState())

        expect(productsViewModel).toEqual({
            type: HomeViewModel.PRODUCTS_EXIST,
            products
        })
    })
})