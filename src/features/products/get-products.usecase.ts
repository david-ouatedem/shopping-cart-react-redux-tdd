import {createAppAsyncThunk} from "../../app/create-app-thunk.ts";

export const getProducts = createAppAsyncThunk(
    'products/get-all',
    async (_,{extra: {productsGatewayHttp}}) => {
        const products = await productsGatewayHttp.getAll()
        return products
    }
)