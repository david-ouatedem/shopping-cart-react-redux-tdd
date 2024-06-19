import {createEntityAdapter} from "@reduxjs/toolkit";

export interface CartItemEntity {
    id: string,
    name: string,
    quantity: number,
    productUnitPrice: number
}
export const cartEntityAdapter = createEntityAdapter<CartItemEntity>()