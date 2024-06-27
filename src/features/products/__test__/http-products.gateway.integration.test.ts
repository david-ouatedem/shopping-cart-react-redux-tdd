import {describe, expect, test} from "vitest";
import nock from "nock";
import {ProductsGatewayHttp} from "../infrastructure/productsGatewayHttp.ts";

describe("productsGatewayHttp", () => {
    test("get products", async () => {
        const fakeResponse  = [
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
        nock("http://localhost:5174")
            .get("/products.json")
            .reply(304, fakeResponse)

        const productsGateway = new ProductsGatewayHttp()

        const response = await productsGateway.getAll()

        expect(response).toEqual({
            status: true,
            products: fakeResponse
        })
    })
})