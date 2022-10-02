import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProductList } from '../../types'

interface CartSlice {
  value: CartProductList
}

const initialState = {
  value: [] as CartProductList[],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.value.push(action.payload)
    },
    delProduct: (state, action) => {
      state.value = state.value.filter(
        (product) => product.id !== action.payload.id
      )
    },
  },
})

export const { addProduct, delProduct } = cartSlice.actions

export default cartSlice.reducer
