import {describe, expect, test} from "vitest";
import {createCartViewModel} from "../view-model/cart.viewModel.ts";
import {creatTestStore} from "../../../app/create-store.ts";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {stateBuilder} from "../../../app/state-builder.ts";
import {removeCartItem, updateCartItemQuantity} from "../../../features/cart/slice/cart.slice.ts";

describe("Feature: cart view model", () => {

    // const createTestCartViewModel = ({
    //      dispatch = vitest.fn,
    //      state = stateBuilder().build()
    //                                  }:{
    //     dispatch?: AppDispatch,
    //     state?: RootState
    // }) => createCartViewModel({
    //     dispatch
    // })(state)

    const cartItem: CartItemEntity =
        {
            id: "300",
            name: "banana",
            quantity: 4,
            productUnitPrice: 200
        }

    test("Example: should produce cart item total correctly", () => {

        const initialState = stateBuilder().withCartItems([cartItem]).build()
        const store = creatTestStore({}, initialState)

        const {total, cartItems} = createCartViewModel({
            dispatch: store.dispatch
        })(store.getState())


        const expectedCartItemTotal = cartItems.reduce((acc, item) => {
            return acc + (item.quantity * item.productUnitPrice)
        }, 0)
        expect(total(cartItem)).toEqual(expectedCartItemTotal)
    })

    test("dispatch remove cart item action with correct arguments", () => {
        const store = creatTestStore()
        const {handleRemoveCartItem} = createCartViewModel({
            dispatch: store.dispatch
        })(store.getState())

        handleRemoveCartItem(cartItem)

        const action = store.getActions()
            .find(a => a.type === removeCartItem.type)

        expect(action?.payload).toEqual({
            cartItemId: cartItem.id
        })
    })

    test("dispatch update cart item action with correct arguments", () => {
        const store = creatTestStore()
        const {handleChangeQuantity} = createCartViewModel({
            dispatch: store.dispatch
        })(store.getState())

        handleChangeQuantity(5,cartItem.id)

        const action = store.getActions()
            .find(a => a.type === updateCartItemQuantity.type)

        expect(action?.payload).toEqual({
            updatedQuantity: 5,
            cartItemId: cartItem.id
        })
    })
})
