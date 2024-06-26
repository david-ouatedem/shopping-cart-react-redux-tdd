import {AppDispatch, RootState} from "../../../app/create-store.ts";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {
    clearCartItems,
    removeCartItem,
    selectCartItems,
    selectCartTotalCost,
    updateCartItemQuantity
} from "../../../features/cart/slice/cart.slice.ts";

export type CartViewModelType = {
    total: (item: CartItemEntity) => number
    cartTotalCost: number
    cartItems: CartItemEntity[]
    handleRemoveCartItem: (item: CartItemEntity) => void
    handleChangeQuantity: (updatedQuantity: number, cartItemId: string) => void
    handleSubmit: () => void
}

export const createCartViewModel = (
    {
        dispatch
    }:{
        dispatch: AppDispatch
    }
) => (rootState: RootState): CartViewModelType => {
    const total = (item: CartItemEntity) => {
        return +(item.quantity * item.productUnitPrice).toFixed(2);
    }
    const cartItems = selectCartItems(rootState)
    const cartTotalCost = selectCartTotalCost(rootState)

    const handleRemoveCartItem = (item: CartItemEntity) => {
        dispatch(removeCartItem(
            {
                cartItemId: item.id
            }
        ))
    }

    const handleChangeQuantity = (updatedQuantity: number, cartItemId: string) => {
        dispatch(updateCartItemQuantity({
            updatedQuantity: updatedQuantity,
            cartItemId
        }))
    }

    const handleSubmit = () => {
        dispatch(clearCartItems())
        window.alert("payment made successfully")
    }

    return{
        total,
        cartTotalCost,
        cartItems,
        handleRemoveCartItem,
        handleChangeQuantity,
        handleSubmit
    }
}