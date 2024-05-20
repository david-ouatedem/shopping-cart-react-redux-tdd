import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/create-store";
import { selectProducts } from "../../features/products/products.slice";
import styles from "./Products.module.css";
import { useEffect } from "react";
import { getProducts } from "../../features/products/get-products.usecase";

export function Products() {
  const products = useAppSelector(selectProducts)
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, []);
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
                  onClick={() => {}}
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
