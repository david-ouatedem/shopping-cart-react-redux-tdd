import {describe, expect, test} from "vitest";
import {stateBuilder} from "../../../app/state-builder.ts";
import {creatTestStore} from "../../../app/create-store.ts";
import {removeProduct, selectCartItems} from "../slice/cart.slice.ts";

describe("Feature: remove cart item feature", () => {
    test("Example: can remove product from cart", () => {
        const initialState = stateBuilder().withCartItems([
            {
                id: "300",
                name: "headphones",
                quantity: 1,
                productUnitPrice: 200
            }
        ]).build()
        const store = creatTestStore({},initialState)

        store.dispatch(removeProduct({cartItemId: "300"}))

        const cart = selectCartItems(store.getState())
        expect(cart).toEqual([])
    })
    
})