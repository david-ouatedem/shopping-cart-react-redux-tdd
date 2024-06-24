import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/create-store.ts";
import {removeProduct, selectCartItems} from "../../features/cart/slice/cart.slice.ts";
import {useState} from "react";
import {CartItemEntity} from "../../features/cart/model/cart.entity.ts";

export interface CartBehaviour {
    removeCartItem: (item: CartItemEntity) => void
    total: (item: CartItemEntity) => number
    totalCartPrice: number
    handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    cartItems: CartItemEntity[]
}


export const useCart = (): CartBehaviour => {

    const dispatch = useDispatch()
    const initialCartItems = useAppSelector(selectCartItems)
    const [cartItems, setCartItems] = useState(initialCartItems)


    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newQuantity = +event.target.value
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        )
    }

    const total = (item: CartItemEntity) => {
    return +(item.quantity * item.productUnitPrice).toFixed(2);
    }

    const totalCartPrice = +cartItems.reduce((total,item) => {
        return total + (item.productUnitPrice * item.quantity)
    },0).toFixed(2)

    const removeCartItem = (item: CartItemEntity) => {
        dispatch(removeProduct(
            {
                cartItemId: item.id
            }
        ))
        setCartItems((prevState) => {
            return prevState.filter(cartItem => item.id !== cartItem.id)
        })
    }

    return{
        removeCartItem,
        totalCartPrice,
        handleChangeQuantity,
        total,
        cartItems
    }
}