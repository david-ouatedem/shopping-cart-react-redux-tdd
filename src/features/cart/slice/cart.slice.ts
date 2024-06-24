import {createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {cartEntityAdapter, CartItemEntity} from "../model/cart.entity.ts";
import {RootState} from "../../../app/create-store.ts";

type CartState = EntityState<CartItemEntity, string> & {
    cartTotalCost: number
}
const initialState: CartState = cartEntityAdapter.getInitialState({
    cartTotalCost: 0
})
export const cartSlice = createSlice({
    name: "cart",
    reducers: {
        addCartItem(state, action: PayloadAction<CartItemEntity>) {
            const existingItem = state.entities[action.payload.id];
            if (existingItem){
                existingItem.quantity += action.payload.quantity;
            }
            cartEntityAdapter.addOne(state, action.payload)
            state.cartTotalCost = Object.values(state.entities).reduce((total, item) => {
                return total + (item.productUnitPrice * item.quantity)
            }, 0)
            state.cartTotalCost = +state.cartTotalCost.toFixed(2)
        },
        removeCartItem(state, action: PayloadAction<{ cartItemId: string }>) {
            const item = state.entities[action.payload.cartItemId];
            if (item) {
                state.cartTotalCost -= (item.productUnitPrice * item.quantity)
                state.cartTotalCost = Math.max(state.cartTotalCost, 0);
                state.cartTotalCost = +state.cartTotalCost.toFixed(2)
                cartEntityAdapter.removeOne(state, action.payload.cartItemId)
            }
        },
        updateCartItemQuantity(state, action: PayloadAction<{
            updatedQuantity: string,
            cartItemId: string
        }>){
            const newQuantity = +action.payload.updatedQuantity

            cartEntityAdapter.updateOne(state,{
                id: action.payload.cartItemId,
                changes: {
                    quantity: newQuantity
                }
            })
            state.cartTotalCost = Object.values(state.entities).reduce((total, item) => {
                return total + (item.productUnitPrice * item.quantity)
            }, 0)
            state.cartTotalCost = +state.cartTotalCost.toFixed(2)
        }

    },
    initialState
})

export const {addCartItem, removeCartItem,updateCartItemQuantity} = cartSlice.actions


export const selectCartItems = (state: RootState) =>
    cartEntityAdapter.getSelectors().selectAll(state.cartReducer)

export const selectCartTotalCost = (state: RootState) =>
    state.cartReducer.cartTotalCost