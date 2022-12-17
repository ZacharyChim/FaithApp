import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICategory, IGetCategories } from './categoryType'

export type ICategoryState = {
  status: StoreStatus
  categories: ICategory[]
}



export const getCategories = createAsyncThunk('category/get', async () => {
    const response = await api().get<IGetCategories>('/product-categories', {populate: '*'})
    return response.data?.data.map(d => ({...d.attributes, id: d.id})) || []
})

const initialState: ICategoryState = {
  status: 'idle',
  categories: []
}

export const categorySlice = createSlice({
  name: 'category',
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
      .addCase(getCategories.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'success'
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const categoryActions = categorySlice.actions
export const categorySeletor = (state: {category: ICategoryState}) => state.category
