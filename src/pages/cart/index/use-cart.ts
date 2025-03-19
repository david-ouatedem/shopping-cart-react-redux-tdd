import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/create-store.ts";
import {useState} from "react";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {
    clearCartItems,
    removeCartItem,
    selectCartItems,
    selectCartTotalCost,
    updateCartItemQuantity
} from "../../../features/cart/slice/cart.slice.ts";

export type CartBehaviour = ReturnType<typeof useCart>;


export const useCart = () => {

    const dispatch = useDispatch()

    const cartItems = useAppSelector(selectCartItems)
    const cartTotalCost = useAppSelector(selectCartTotalCost)

    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false)


    const handleOpenCheckout = () => {
        setCheckoutModalIsOpen(true)
    }

    const handleCloseCheckout = () => {
        setCheckoutModalIsOpen(false)
    }

    const getCartItemTotal = (item: CartItemEntity) => {
        return +(item.quantity * item.productUnitPrice).toFixed(2);
    }

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
        checkoutModalIsOpen,
        handleOpenCheckout,
        handleCloseCheckout,
        getCartItemTotal,
        cartTotalCost,
        cartItems,
        handleRemoveCartItem,
        handleChangeQuantity,
        handleSubmit
    }
}