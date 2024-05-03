import {Product} from "./product.model.ts";

export interface ProductsGateway {
    getAll: ()=>Promise<Product[]>
}