import {useEffect} from "react";
import {getProducts} from "../../features/products/get-products.usecase.ts";
import {useDispatch} from "react-redux";
const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, []);
    return (
    <main className="page">
      <h1>Welcome to the Store</h1>
      <figure>
        <img src="/store.jpg" alt="A large old storefront" width="800" />
        <figcaption>Gary Houston, CC0, via Wikimedia Commons</figcaption>
      </figure>
    </main>
  );
};

export default Home;
