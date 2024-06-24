import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/create-store.ts";
import {
    removeCartItem,
    selectCartItems,
    selectCartTotalCost,
    updateCartItemQuantity
} from "../../features/cart/slice/cart.slice.ts";
import {CartItemEntity} from "../../features/cart/model/cart.entity.ts";
import {useState} from "react";

export interface CartBehaviour {
    handleRemoveCartItem: (item: CartItemEntity) => void
    total: (item: CartItemEntity) => number
    cartTotalCost: number
    handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => void
    cartItems: CartItemEntity[]
    handleSubmit: () => void
    checkoutModalIsOpen: boolean
    handleOpenCheckout: () => void
    handleCloseCheckout: () => void
}


export const useCart = (): CartBehaviour => {

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

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
        dispatch(updateCartItemQuantity({
            updatedQuantity: event.target.value,
            cartItemId
        }))
    }

    const total = (item: CartItemEntity) => {
    return +(item.quantity * item.productUnitPrice).toFixed(2);
    }

    const handleRemoveCartItem = (item: CartItemEntity) => {
        dispatch(removeCartItem(
            {
                cartItemId: item.id
            }
        ))
    }

    const handleSubmit = () => {

    }

    return{
        handleRemoveCartItem,
        cartTotalCost,
        handleChangeQuantity,
        total,
        cartItems,
        handleSubmit,
        checkoutModalIsOpen,
        handleOpenCheckout,
        handleCloseCheckout
    }
}