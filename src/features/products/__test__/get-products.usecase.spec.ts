import {beforeEach, describe, test} from "vitest";
import {createProductsFixture, ProductsFixture} from "./products.fixture.ts";
describe("Feature: get all available products", () => {
    let fixture: ProductsFixture;

    beforeEach(() => {
        fixture = createProductsFixture()
    });

    test("Example: getting product headphones", async ()=> {
        fixture.givenExampleProduct([
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

        await fixture.whenGettingProducts()

        fixture.thenProductShouldBe({
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