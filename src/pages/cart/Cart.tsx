import styles from "./Cart.module.css";
import {useAppSelector} from "../../app/create-store.ts";
import {removeProduct, selectCartItems, selectCartTotal} from "../../features/cart/slice/cart.slice.ts";
import {useDispatch} from "react-redux";

export function Cart() {
    const dispatch = useDispatch()
    const cartItems = useAppSelector(selectCartItems)
    const totalCartPrice = useAppSelector(selectCartTotal)
    // const [quantity, setQuantity] = useState<number>(1)
    // const [total, setTotal] = useState<number>(0)

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
                    // const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
                    //     const newQuantity = +event.target.value
                    //     const newTotal = +(newQuantity * item.productUnitPrice).toFixed(2)
                    //     setQuantity(newQuantity)
                    //     setTotal(newTotal)
                    // }
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={item.quantity}
                                    // onChange={(event) => handleChangeQuantity(event)}
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
