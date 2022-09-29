import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProductList } from '../../types'

interface CartSlice {
  value: CartProductList
}

const defaultImage = require('../../assets/images/products/product.png')

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
  },
})

export const { addProduct } = cartSlice.actions

export default cartSlice.reducer
