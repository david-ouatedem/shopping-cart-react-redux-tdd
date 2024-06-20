import {createAppAsyncThunk} from "../../../app/create-app-thunk.ts";

export const getProducts = createAppAsyncThunk(
    'products/get-all',
    async (_,{extra: {productsGatewayHttp},rejectWithValue}) => {
        try{
            const response =  await productsGatewayHttp.getAll()
            if (!response.status) {
                return rejectWithValue("error when fetching products")
            }
            return response
        }catch(error: unknown){
            return rejectWithValue((error as {message: string}).message || "An unknown error occurred")
        }
    }
)