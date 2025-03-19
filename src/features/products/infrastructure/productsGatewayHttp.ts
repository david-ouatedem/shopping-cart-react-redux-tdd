import {GetAllProductsResponse, ProductsGateway} from "../model/Products.gateway.ts";


export class ProductsGatewayHttp implements ProductsGateway {
    async getAll(): Promise<GetAllProductsResponse> {
        let response: Response
        try {
            response = await fetch("http://localhost:5174/products.json")
        } catch (e) {
            console.log("Fetch error:", e);
            throw new Error(`Network error: ${(e as Error).message}`);
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        try {
            const result = await response.json()
            return {
                status: true,
                products: result
            }
        } catch (e) {
            throw new Error("An error occurred when parsing the response");
        }
    }
}