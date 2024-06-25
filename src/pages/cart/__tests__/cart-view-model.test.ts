import {describe, expect, test} from "vitest";
import {createCartViewModel} from "../view-model/cart.viewModel.ts";
import {creatTestStore} from "../../../app/create-store.ts";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";

describe("Feature: cart view model", () => {
    test("Example: should produce cart item total correctly", () => {
        const cartItem: CartItemEntity =
            {
                id: "300",
                name: "banana",
                quantity: 4,
                productUnitPrice: 200
            }
        const initialState = stateBuilder().withCartItems([cartItem]).build()
        const store = creatTestStore({}, initialState)

        const {total, cartItems} = createCartViewModel(store.getState())

        const expectedCartItemTotal = cartItems.reduce((acc, item) => {
            return acc + (item.quantity * item.productUnitPrice)
        }, 0)
        expect(total(cartItem)).toEqual(expectedCartItemTotal)
    })
})