import { Product } from "../../app/api";

export interface ProductGateway {
  getAllProducts(): Promise<Product[]>;
}
