import { Product } from "./product.entity";

export type GetAllProductsResponse = {
    status: boolean
    products: Product[]
}

export interface ProductsGateway {
    getAll: ()=>Promise<GetAllProductsResponse>
}