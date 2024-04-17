import {describe, test, expect, vi, beforeEach} from "vitest"
import { getProducts } from "../../app/api"




describe("products",()=>{
  test("should get products from api", async () => {
    const mockedProducts = 
  
    const products = await getProducts()
  
    expect(products).toEqual(mockedProducts)
  })
})
