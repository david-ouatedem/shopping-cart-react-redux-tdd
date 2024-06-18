import {describe, expect, test} from "vitest";
import {Product} from "../model/product.entity.ts";
import {creatTestStore} from "../../../app/create-store.ts";
import {getProducts} from "../usecase/get-all-products.usecase.ts";
import {selectProducts} from "../slice/products.slice.ts";
import {stateBuilder} from "../../../app/state-builder.ts";

describe("feature: get all available products", () => {
    test("example: should get product headphones by product id", async ()=> {
        givenExampleProduct([
            {
                id: "300",
                description: "Look cool while blocking out the rest of the world.",
                imageAlt: "Cool looking headphones in gray and black",
                name: "Headphones",
                price: 34.99,
                imageCredit: "\"Headphones in Black and White\" by Image Catalog is marked under CC0 1.0.",
                imageURL: "https://live.staticflickr.com/5763/22921682035_334b6161c9_b.jpg"
            }
        ])

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
const store = creatTestStore();


function givenExampleProduct (products: Product[]) {
    const initialState = stateBuilder()
        .withProducts(products).build()

    return initialState
}

async function whenGettingProducts () {
    await store.dispatch(getProducts())
}

function thenProductShouldBe(expectedProduct:Product) {
    const products = selectProducts({productsReducer: store.getState().productsReducer});
    expect(products[0]).toEqual(expectedProduct)
}