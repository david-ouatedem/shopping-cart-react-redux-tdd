import {ProductsGateway} from "./Products.gateway.ts";
import {Product} from "./product.entity.ts";

export class ProductsGatewayHttp implements ProductsGateway {
    async getAll(): Promise<Product[]> {
       try {
           const response = await fetch("/products.json")
           if (!response.ok){
               throw new Error("something wrong happened when getting products")
           }
           return  await response.json()
       }catch (e){
           console.error(e)
           throw e
       }
    }
}