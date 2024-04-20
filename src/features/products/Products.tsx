import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import styles from "./Products.module.css";
import { getProducts, selectProducts } from "./products.slice";
import { addItem } from "../cart/cart.slice";

export function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <main className="page">
      <ul className={styles.products}>
        {(products ?? []).map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button
                  onClick={() => {
                    dispatch(addItem({ productId: product.id, quantity: 5 }));
                  }}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
