import { Product } from "./product.entity";

export interface ProductsGateway {
    getAll: ()=>Promise<Product[]>
}