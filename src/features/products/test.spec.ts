import { describe, test, expect } from "vitest";
import { store } from "../../app/store";
import { getProducts } from "./products.slice";

describe("products", () => {
  test("get products", async () => {
    givenProducts([
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
    ]);

    await whenGettingProducts();

    thenReceivedProducts([
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
    ]);
  });
});

function givenProducts(
  products: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    imageAlt: string;
    imageCredit: string;
  }[]
) {
  return products;
}

async function whenGettingProducts() {
  await store.dispatch(getProducts());
}

function thenReceivedProducts(
  expectedProducts: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    imageAlt: string;
    imageCredit: string;
  }[]
) {
  const products = store.getState().productsReducer.products;
  console.log(products);

  expect(products).toEqual(expectedProducts);
}
