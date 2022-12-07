import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageSourcePropType } from 'react-native'


export type CartProduct = {
  categoryId: number
  id: number
  name: string
  imageUri: ImageSourcePropType
  price: number
  discountPrice: number
  description: string
  color: string
  size: string
  quantity: number
}

export type CartProductList = {
  products: Array<CartProduct>
}

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
