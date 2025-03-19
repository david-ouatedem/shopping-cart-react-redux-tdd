import {describe, expect, test} from "vitest";
import {creatTestStore} from "../../../app/create-store.ts";
import {
    addCartItem,
    clearCartItems,
    removeCartItem,
    selectCartItems,
    selectCartTotalCost,
    updateCartItemQuantity
} from "../slice/cart.slice.ts";
import {CartItemEntity} from "../model/cart.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";

describe("Feature: cart features", () => {
    test("Example: can add a product to cart", () => {
        const cartItems: CartItemEntity = {
            id: "300",
            name: "headphones",
            quantity: 1,
            productUnitPrice: 200
        }
        const store = creatTestStore()

        store.dispatch(addCartItem(cartItems))

        const cart = selectCartItems(store.getState())
        expect(cart).toEqual([cartItems])
    })

    test("Example: can remove product from cart", () => {
        const initialState = stateBuilder().withCartItems([
            {
                id: "300",
                name: "headphones",
                quantity: 1,
                productUnitPrice: 200
            },
            {
                id: "209",
                name: "Ice cream",
                quantity: 1,
                productUnitPrice: 3.49
            }
        ]).build()
        const store = creatTestStore({}, initialState)

        store.dispatch(removeCartItem({cartItemId: "300"}))

        const cart = selectCartItems(store.getState())
        const expectedTotalCost = +cart.reduce((total, item) => {
            return total + (item.productUnitPrice * item.quantity)
        },0).toFixed(2)
        expect(cart).toEqual([
            {
                id: "209",
                name: "Ice cream",
                quantity: 1,
                productUnitPrice: 3.49
            }
        ])
        expect(expectedTotalCost).toEqual(3.49)
    })

    test("Example: can update cart item quantity", () => {
        const cartItems: CartItemEntity = {
            id: "300",
            name: "headphones",
            quantity: 1,
            productUnitPrice: 200
        }
        const initialState = stateBuilder().withCartItems([cartItems]).build()
        const store = creatTestStore({}, initialState)

        store.dispatch(updateCartItemQuantity({
            cartItemId: "300",
            updatedQuantity: 5
        }))

        const cart = selectCartItems(store.getState())
        expect(cart).toEqual([{
            id: "300",
            name: "headphones",
            quantity: 5,
            productUnitPrice: 200
        }])
    })

    test("Example: should update cart total cost", () => {
        const cartItems: CartItemEntity[] = [
            {
                id: "300",
                name: "headphones",
                quantity: 1,
                productUnitPrice: 34.99
            },
            {
                id: "209",
                name: "Ice cream",
                quantity: 3,
                productUnitPrice: 3.49
            }
        ]
        const initialState = stateBuilder().withCartItems(cartItems).build()
        const store = creatTestStore({}, initialState)

        store.dispatch(updateCartItemQuantity({
            cartItemId: "300",
            updatedQuantity: 5
        }))

        const cart = selectCartItems(store.getState())
        const expectedTotalCost = +cart.reduce((total, item) => {
            return total + (item.productUnitPrice * item.quantity)
        },0).toFixed(2)

        const cartTotalCost = selectCartTotalCost(store.getState())
        expect(cartTotalCost).toEqual(expectedTotalCost)
    })

    test("Example: should clear all cart items", () => {
        const cartItems: CartItemEntity[] = [
            {
                id: "300",
                name: "headphones",
                quantity: 1,
                productUnitPrice: 34.99
            },
            {
                id: "209",
                name: "Ice cream",
                quantity: 3,
                productUnitPrice: 3.49
            }
        ]
        const initialState = stateBuilder().withCartItems(cartItems).build()
        const store = creatTestStore({}, initialState)

        store.dispatch(clearCartItems())

        const cart = selectCartItems(store.getState())
        const cartTotalCost = selectCartTotalCost(store.getState())
        expect(cart).toEqual([])
        expect(cartTotalCost).toEqual(0)
    })
})