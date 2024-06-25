import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/create-store.ts";
import {
    removeCartItem,
    updateCartItemQuantity
} from "../../../features/cart/slice/cart.slice.ts";
import {CartItemEntity} from "../../../features/cart/model/cart.entity.ts";
import {useState} from "react";
import {CartViewModelType, createCartViewModel} from "../view-model/cart.viewModel.ts";

export interface CartBehaviour {
    handleRemoveCartItem: (item: CartItemEntity) => void
    handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => void
    handleSubmit: () => void
    checkoutModalIsOpen: boolean
    handleOpenCheckout: () => void
    handleCloseCheckout: () => void
    cartViewModel: CartViewModelType
}


export const useCart = (): CartBehaviour => {

    const dispatch = useDispatch()

    const cartViewModel = useAppSelector(createCartViewModel)

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
        handleChangeQuantity,
        handleSubmit,
        checkoutModalIsOpen,
        handleOpenCheckout,
        handleCloseCheckout,
        cartViewModel
    }
}