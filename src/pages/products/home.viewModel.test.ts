import {beforeEach, describe, expect, test} from "vitest";
import {AppStore, creatTestStore} from "../../app/create-store.ts";
import {HomeViewModel, selectProductsViewModel} from "./products.ViewModel.ts";
import {FakeProductsGateway} from "../../features/products/fakeProductsGateway.ts";
import {getProducts} from "../../features/products/get-products.usecase.ts";
import {Product} from "../../features/products/product.entity.ts";

describe("products view model", () => {
    let fakeProductsGateway: FakeProductsGateway;
    let store: AppStore;
    beforeEach(()=>{
        fakeProductsGateway = new FakeProductsGateway()
        store = creatTestStore({
            productsGatewayHttp: fakeProductsGateway
        });
    })

    test("products does not exist", async () => {
        fakeProductsGateway.returnedProducts = []
        await store.dispatch(getProducts())

        const productsViewModel = selectProductsViewModel(store.getState())

        expect(productsViewModel).toEqual({
            type: HomeViewModel.NO_PRODUCTS
        })
    })

    test("products are empty", async () => {
        fakeProductsGateway.returnedProducts = []
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
        }
        ]
        fakeProductsGateway.returnedProducts = products
        await store.dispatch(getProducts())

        const productsViewModel = selectProductsViewModel(store.getState())

        expect(productsViewModel).toEqual({
            type: HomeViewModel.PRODUCTS_EXIST,
            products
        })
    })
})