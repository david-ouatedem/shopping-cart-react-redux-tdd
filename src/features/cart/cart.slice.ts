import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type CartState = {
  cartItems: {
    productId: string;
    quantity: number;
  }[];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  } as CartState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        state.cartItems.unshift({ productId, quantity });
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export const selectCartItems = createSelector(
  (state: RootState) => state.cartReducer.cartItems,
  (cartItems) => cartItems
);
export const getTotalPrice = createSelector(
  (state: RootState) => state.cartReducer.cartItems,
  (state: RootState) => state.productsReducer.products,
  (items, products) => {
    let total = 0;
    for (const id in items) {
      total += products[id].price * items[id].quantity;

      return total.toFixed(2);
    }
  }
);
