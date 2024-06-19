import {createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {cartEntityAdapter, CartItemEntity} from "../model/cart.entity.ts";
import {RootState} from "../../../app/create-store.ts";

type CartState = EntityState<CartItemEntity, string> & {
    cartTotalPrice: number
}
const initialState: CartState = cartEntityAdapter.getInitialState({
    cartTotalPrice: 0
})
export const cartSlice = createSlice({
    name: "cart",
    reducers: {
        addProduct(state, action: PayloadAction<CartItemEntity>) {
            const existingItem = state.entities[action.payload.id];
            if (existingItem){
                existingItem.quantity += action.payload.quantity;
            }
            cartEntityAdapter.addOne(state, action.payload)
            state.cartTotalPrice = Object.values(state.entities).reduce((total, item) => {
                return total + (item.productUnitPrice) * (item.quantity)
            }, 0)
            state.cartTotalPrice = +state.cartTotalPrice.toFixed(2)
        },
        removeProduct(state, action: PayloadAction<{ cartItemId: string }>) {
            const item = state.entities[action.payload.cartItemId];
            if (item) {
                state.cartTotalPrice -= (item.productUnitPrice) * (item.quantity)
                state.cartTotalPrice = Math.max(state.cartTotalPrice, 0);
                state.cartTotalPrice = +state.cartTotalPrice.toFixed(2)
                cartEntityAdapter.removeOne(state, action.payload.cartItemId)
            }
        }
    },
    initialState
})

export const {addProduct, removeProduct} = cartSlice.actions


export const selectCartItems = (state: RootState) =>
    cartEntityAdapter.getSelectors().selectAll(state.cartReducer)

export const selectCartTotal = (state: RootState) =>
    state.cartReducer.cartTotalPrice