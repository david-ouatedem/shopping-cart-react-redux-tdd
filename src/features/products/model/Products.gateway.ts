import { Product } from "./product.entity.ts";

export type GetAllProductsResponse = {
    status: boolean
    products: Product[]
}

export interface ProductsGateway {
    getAll: ()=>Promise<GetAllProductsResponse>
}