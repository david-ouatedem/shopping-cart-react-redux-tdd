import {useAppSelector} from "../../../app/create-store.ts";
import {HomeViewModel, selectProductsViewModel} from "./products.ViewModel.ts";
import styles from "../css/Products.module.css";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../features/cart/slice/cart.slice.ts";

const ProductsViewBuilder = () => {
    const dispatch = useDispatch()
    const viewModel = useAppSelector(selectProductsViewModel)
    switch (viewModel.type) {
        case HomeViewModel.EMPTY_PRODUCTS:
            return (
                <div className={styles.center}>{viewModel.info}</div>
            )
        case HomeViewModel.PRODUCTS_EXIST:
            return (
                <main className="page">
                    <ul className={styles.products}>
                        {(viewModel.products ?? []).map((product) => (
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
                                                dispatch(addProduct({
                                                    id: product.id,
                                                    productUnitPrice: product.price,
                                                    name: product.name,
                                                    quantity: 1
                                                }))
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
};

export default ProductsViewBuilder;