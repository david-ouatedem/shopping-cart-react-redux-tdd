import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/create-store.ts";
import {
    removeCartItem,
    selectCartItems,
    selectCartTotalCost,
    updateCartItemQuantity
} from "../../features/cart/slice/cart.slice.ts";
import {CartItemEntity} from "../../features/cart/model/cart.entity.ts";

export interface CartBehaviour {
    handleRemoveCartItem: (item: CartItemEntity) => void
    total: (item: CartItemEntity) => number
    cartTotalCost: number
    handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => void
    cartItems: CartItemEntity[]
}


export const useCart = (): CartBehaviour => {

    const dispatch = useDispatch()
    const cartItems = useAppSelector(selectCartItems)
    const cartTotalCost = useAppSelector(selectCartTotalCost)


    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
        dispatch(updateCartItemQuantity({
            updatedQuantity: event.target.value,
            cartItemId
        }))
    }

    const total = (item: CartItemEntity) => {
    return +(item.quantity * item.productUnitPrice).toFixed(2);
    }

    // const totalCartPrice = +cartItems.reduce((total,item) => {
    //     return total + (item.productUnitPrice * item.quantity)
    // },0).toFixed(2)

    const handleRemoveCartItem = (item: CartItemEntity) => {
        dispatch(removeCartItem(
            {
                cartItemId: item.id
            }
        ))
    }

    return{
        handleRemoveCartItem,
        cartTotalCost,
        handleChangeQuantity,
        total,
        cartItems
    }
}