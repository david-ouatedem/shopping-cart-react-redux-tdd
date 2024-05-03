import styles from "./Cart.module.css";

export function Cart() {
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
          {cartItems.map((item: { productId: string; quantity: number }) => {
            const product = products.find((p) => p.id === item.productId);
            const total = item.quantity * product!.price;
            return (
              <tr key={item.productId}>
                <td>{product?.name}</td>
                <td>
                  <input
                    type="text"
                    className={styles.input}
                    defaultValue={item.quantity}
                  />
                </td>
                <td>${total.toFixed(2)}</td>
                <td>
                  <button aria-label="Remove Magnifying Glass from Shopping Cart">
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
