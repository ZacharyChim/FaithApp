import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct, IProductsGet } from './productType'

export type IProductState = {
    status: StoreStatus
    products: IProduct[]
}

export const getProducts = createAsyncThunk<IProduct[], {id: number}>('product/get', async ({id}) => { 
    const response = await api().get<IProductsGet>('/products', {'populate[availability][populate][0]': 'product_color,product_size', 'populate[images]': '*', 'populate[product_categories]': '*', 'filters[product_categories][id][$eq]': id})
    return response.data?.data.map(d => ({...d.attributes, id: d.id})) || []
})

const initialState: IProductState = {
    status: 'idle',
    products: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle'
        },
        resetLogin: (state) => {
            state.status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'success'
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed'
            })
    },
})

export const productActions = productSlice.actions
export const productSeletor = (state: {product: IProductState}) => state.product
