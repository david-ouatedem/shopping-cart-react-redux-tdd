import {GetAllProductsResponse, ProductsGateway} from "./Products.gateway.ts";

export class ProductsGatewayHttp implements ProductsGateway {
    async getAll(): Promise<GetAllProductsResponse> {
       try {
           const response = await fetch("/products.json")
           if (!response.ok){
               throw new Error("something wrong happened when getting products")
           }
           const result = await response.json()
           return  {
               status: response.ok,
               products: result
           }
       }catch (e){
           console.error(e)
           throw e
       }
    }
}