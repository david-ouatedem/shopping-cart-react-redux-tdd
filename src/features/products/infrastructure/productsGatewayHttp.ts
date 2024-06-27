import {GetAllProductsResponse, ProductsGateway} from "../model/Products.gateway.ts";


export class ProductsGatewayHttp implements ProductsGateway {
    async getAll(): Promise<GetAllProductsResponse> {
        let response: Response
        try {
            response = await fetch("/products.json")
        } catch (e) {
            throw new Error("something wrong happened when getting products")
        }

        try {
            const result = await response.json()
            return {
                status: response.ok,
                products: result
            }
        } catch (e) {
            throw new Error("An error occurred when handling request")
        }
    }
}