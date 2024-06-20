import styles from "./Cart.module.css";
import {useAppSelector} from "../../app/create-store.ts";
import {removeProduct, selectCartItems} from "../../features/cart/slice/cart.slice.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";

export function Cart() {
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

    const totalCartPrice = cartItems.reduce((total,item) => {
        return total + (item.productUnitPrice * item.quantity)
    },0).toFixed(2)

    return (
        <main className="page">
            <h1>Shopping Cart</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => {
                    const total = +(item.quantity * item.productUnitPrice).toFixed(2);
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={item.quantity}
                                    onChange={(event) => handleChangeQuantity(event, item.id)}
                                />
                            </td>
                            <td>${total}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(removeProduct(
                                        {
                                            cartItemId: item.id
                                        }
                                    ))
                                }} aria-label="Remove Magnifying Glass from Shopping Cart">
                                    X
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td className={styles.total}>${totalCartPrice}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            <form>
                <button className={styles.button} type="submit">
                    Checkout
                </button>
            </form>
        </main>
    );
}
