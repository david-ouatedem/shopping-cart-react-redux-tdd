import { ProductEntity } from "./product.entity.ts";

export type GetAllProductsResponse = {
    status: boolean
    products: ProductEntity[]
}

export interface ProductsGateway {
    getAll: ()=>Promise<GetAllProductsResponse>
}