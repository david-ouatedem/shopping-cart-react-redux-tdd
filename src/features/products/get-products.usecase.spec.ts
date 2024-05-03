import {describe, expect, test} from "vitest";
import {Product} from "./product.model.ts";
import {AppStore, creatTestStore} from "../../app/create-store.ts";
import {getProducts} from "./get-products.usecase.ts";
import {selectProducts} from "./products.slice.ts";

describe("feature: get all available products", () => {
    test("example: should get product headphones by product id", async ()=> {
        givenExampleProduct({
            id: "300",
            description: "Look cool while blocking out the rest of the world.",
            imageAlt: "Cool looking headphones in gray and black",
            name: "Headphones",
            price: 34.99,
            imageCredit: "\"Headphones in Black and White\" by Image Catalog is marked under CC0 1.0.",
            imageURL: "https://live.staticflickr.com/5763/22921682035_334b6161c9_b.jpg"
        })

        await whenGettingProducts()

        thenProductShouldBe({
            id: "300",
            description: "Look cool while blocking out the rest of the world.",
            imageAlt: "Cool looking headphones in gray and black",
            name: "Headphones",
            price: 34.99,
            imageCredit: "\"Headphones in Black and White\" by Image Catalog is marked under CC0 1.0.",
            imageURL: "https://live.staticflickr.com/5763/22921682035_334b6161c9_b.jpg"
        })
    })
})

let store: AppStore;

function givenExampleProduct (product: Product) {
    const testStore = creatTestStore({

    })
}

async function whenGettingProducts () {
    store = creatTestStore()
    await store.dispatch(getProducts())
}

function thenProductShouldBe (expectedProduct:Product) {
    const products = selectProducts(store.getState());
    const headphone = products.find((p)=> p.id === expectedProduct.id)
    expect(headphone).toEqual(expectedProduct)
}