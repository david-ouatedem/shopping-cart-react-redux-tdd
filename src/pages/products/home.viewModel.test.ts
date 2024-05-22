import {describe, expect, test} from "vitest";
import {creatTestStore} from "../../app/create-store.ts";
import {HomeViewModel, selectProductsViewModel} from "./products.ViewModel.ts";

describe("products view model", () => {
    test("products does not exist", () => {
        const store = creatTestStore({});

        const productsViewModel = selectProductsViewModel(store.getState())

        expect(productsViewModel).toEqual({
            type: HomeViewModel.NO_PRODUCTS
        })
    })
})