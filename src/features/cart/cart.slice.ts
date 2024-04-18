import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  cart: {
    productId: string;
    quantity: number;
  }[];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {} as CartState,
  reducers: {},
});
