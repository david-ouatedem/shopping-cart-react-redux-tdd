import { Link } from "react-router-dom";
import styles from "../css/CartLink.module.css";
import {useAppSelector} from "../../../app/create-store.ts";
import {selectCartItems} from "../../../features/cart/slice/cart.slice.ts";

export function CartLink() {
    const cartItems = useAppSelector(selectCartItems)
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{`${cartItems.length} Cart`}</span>
    </Link>
  );
}