import {describe, expect, test} from "vitest";
import {creatTestStore} from "../../../app/create-store.ts";
import {addProduct, selectCartItems} from "../slice/cart.slice.ts";
import {CartItemEntity} from "../model/cart.entity.ts";

describe("Feature: add cart item features", () => {
    test("Example: can add a product to cart", () => {
        const cartItems:CartItemEntity = {
            id: "300",
            name: "headphones",
            quantity: 1,
            productUnitPrice: 200
        }
        const store = creatTestStore()

        store.dispatch(addProduct(cartItems))

        const cart = selectCartItems(store.getState())
        expect(cart).toEqual([cartItems])
    })
})