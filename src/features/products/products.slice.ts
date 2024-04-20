import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type ProductsState = {
  products: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    imageAlt: string;
    imageCredit: string;
  }[];
};

export const getProducts = createAsyncThunk("cart/add", () => {
  return [
    {
      id: "207",
      name: "Bananas",
      price: 1.09,
      description:
        "This cluster of delicious bananas will keep your hunger down while filling you with nutritious potassium. ",
      imageURL:
        "https://live.staticflickr.com/7013/6612824761_3f66a93c71_b.jpg",
      imageAlt: "A single bunch of 4 yellow bananas connected toegher",
      imageCredit:
        '"Bananas (edited)" by 24oranges.nl is licensed under CC BY-SA 2.0',
    },
  ];
});

export const selectProducts = createSelector(
  (state: RootState) => state.productsReducer.products,
  (products) => products
);

export const ProductsSlice = createSlice({
  name: "products",
  initialState: {} as ProductsState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
