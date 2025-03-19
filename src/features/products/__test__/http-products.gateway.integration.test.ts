import {describe, expect, test} from "vitest";
import {ProductsGatewayHttp} from "../infrastructure/productsGatewayHttp.ts";

describe("productsGatewayHttp", () => {
    test("get products - calls real API", async () => {
        const productsGateway = new ProductsGatewayHttp();
        const response = await productsGateway.getAll();

        expect(response.status).toBe(true);
        expect(response.products.length).toBeGreaterThan(0);
        expect(response.products).toBeInstanceOf(Array);
    });
})