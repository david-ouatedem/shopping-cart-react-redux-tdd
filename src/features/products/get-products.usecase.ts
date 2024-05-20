import {createAppAsyncThunk} from "../../app/create-app-thunk.ts";

export const getProducts = createAppAsyncThunk(
    'products/get-all',
    async (_,{extra: {productsGatewayHttp},rejectWithValue}) => {
        try{
            const products = await productsGatewayHttp.getAll()
            console.log(products)
            
            return products
        }catch(error){
            return rejectWithValue(error)
        }
    }
)