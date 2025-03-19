import {GetAllProductsResponse, ProductsGateway} from "../model/Products.gateway.ts";

export class FakeProductsGatewayHttp implements ProductsGateway {
    returnedResponse!: GetAllProductsResponse
    async getAll(): Promise<GetAllProductsResponse> {
        return Promise.resolve(this.returnedResponse)
    }
}
