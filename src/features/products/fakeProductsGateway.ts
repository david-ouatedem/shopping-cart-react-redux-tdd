import {ProductsGateway} from "./Products.gateway.ts";
import {Product} from "./product.entity.ts";

export class FakeProductsGateway implements ProductsGateway {
    returnedProducts!: Product[]
    async getAll(): Promise<Product[]> {
        return Promise.resolve(this.returnedProducts)
    }

}

export const fakeProductsGateway = new FakeProductsGateway();