import {GetAllProductsResponse, ProductsGateway} from "./Products.gateway.ts";

export class FakeProductsGateway implements ProductsGateway {
    returnedResponse: GetAllProductsResponse = {
        status: true,
        products: [
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
    }
    async getAll(): Promise<GetAllProductsResponse> {
        return Promise.resolve(this.returnedResponse)
        // return Promise.reject()
    }

}
