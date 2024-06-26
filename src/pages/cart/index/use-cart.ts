import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/create-store.ts";
import {useState} from "react";
import {CartViewModelType, createCartViewModel} from "../view-model/cart.viewModel.ts";

export interface CartBehaviour {
    // handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => void
    handleSubmit: () => void
    checkoutModalIsOpen: boolean
    handleOpenCheckout: () => void
    handleCloseCheckout: () => void
    cartViewModel: CartViewModelType
}


export const useCart = (): CartBehaviour => {

    const dispatch = useDispatch()

    const cartViewModel = useAppSelector(createCartViewModel({dispatch}))

    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false)


    const handleOpenCheckout = () => {
        setCheckoutModalIsOpen(true)
    }

    const handleCloseCheckout = () => {
        setCheckoutModalIsOpen(false)
    }

    // const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
    //     dispatch(updateCartItemQuantity({
    //         updatedQuantity: event.target.value,
    //         cartItemId
    //     }))
    // }

    const handleSubmit = () => {

    }

    return{
        // handleChangeQuantity,
        handleSubmit,
        checkoutModalIsOpen,
        handleOpenCheckout,
        handleCloseCheckout,
        cartViewModel
    }
}