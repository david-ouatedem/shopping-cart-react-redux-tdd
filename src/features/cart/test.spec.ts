import { describe, test, expect, beforeEach } from "vitest";
import { store } from "../../app/store";
import { addItem } from "./cart.slice";
import { getProducts } from "../products/products.slice";

describe("test cart actions", () => {
  beforeEach(() => {
    store.dispatch(getProducts());
  });
  test("should add product to cart", () => {
    const expectedCartItem: {
      productId: string;
      quantity: number;
    } = {
      productId: "207",
      quantity: 5,
    };

    store.dispatch(addItem({ productId: "207", quantity: 5 }));

    const result = store.getState().cartReducer.cartItems;
    const cartItem = result[0];

    expect(cartItem).toEqual(expectedCartItem);
  });
  test("should give total of cartItem", async () => {
    // store.dispatch(addItem({ productId: "207", quantity: 5 }));
    // await store.dispatch(getProducts());

    const items = store.getState().cartReducer.cartItems;
    const products = store.getState().productsReducer.products;
    const totalItemCost = items[0].quantity * products[0].price;

    expect(totalItemCost).toEqual(5.45);
  });
  test("should give total amout of cart", () => {});
});
