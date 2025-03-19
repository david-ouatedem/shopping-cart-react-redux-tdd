import styles from "../css/Cart.module.css";
import {useCart} from "./use-cart.ts";

export function Cart() {
    const {
        handleOpenCheckout,
        handleCloseCheckout,
        checkoutModalIsOpen,
        getCartItemTotal,
        handleRemoveCartItem,
        cartItems,
        handleSubmit,
        handleChangeQuantity,
        cartTotalCost
    } = useCart()
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

                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={item.quantity}
                                    onChange={(event) =>
                                        handleChangeQuantity(+event.target.value, item.id)
                                }
                                />
                            </td>
                            <td>${getCartItemTotal(item)}</td>
                            <td>
                                <button onClick={() => handleRemoveCartItem(item)}
                                        aria-label="Remove Magnifying Glass from Shopping Cart">
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
                    <td className={styles.total}>${cartTotalCost}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            <form onSubmit={(event)=>{
                event.preventDefault()
                handleSubmit()
            }}>
                <dialog open={checkoutModalIsOpen} id="mypopover">
                    <p>The total cost of your cart amounts to</p>
                    <p className={styles.total}>${cartTotalCost}</p>
                    <div className={styles.flexCenter}>
                        <button type="button" onClick={handleCloseCheckout}>Cancel</button>
                        <button type="submit">Checkout</button>
                    </div>
                </dialog>
            </form>
            <button
                className={styles.button}
                type="button"
                onClick={handleOpenCheckout}
            >
                Checkout
            </button>
        </main>
    );
}
