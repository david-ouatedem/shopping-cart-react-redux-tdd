import React from "react";
import { CartLink } from "./features/cart/CartLink";
import styles from "./App.module.css";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/products">
            Products
          </Link>
          <CartLink />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
