import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/create-store.ts";
import {useState} from "react";
import {CartViewModelType, createCartViewModel} from "../view-model/cart.viewModel.ts";

export interface CartBehaviour {
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

    return{
        checkoutModalIsOpen,
        handleOpenCheckout,
        handleCloseCheckout,
        cartViewModel
    }
}