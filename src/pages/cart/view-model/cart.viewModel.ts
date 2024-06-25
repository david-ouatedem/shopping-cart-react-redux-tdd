import {RootState} from "../../../app/create-store.ts";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {selectCartItems, selectCartTotalCost} from "../../../features/cart/slice/cart.slice.ts";

export type CartViewModelType = {
    total: (item: CartItemEntity) => number
    cartTotalCost: number
    cartItems: CartItemEntity[]
}

export const createCartViewModel = (rootState: RootState): CartViewModelType => {
    const total = (item: CartItemEntity) => {
        return +(item.quantity * item.productUnitPrice).toFixed(2);
    }
    const cartItems = selectCartItems(rootState)
    const cartTotalCost = selectCartTotalCost(rootState)

    return{
        total,
        cartTotalCost,
        cartItems
    }
}