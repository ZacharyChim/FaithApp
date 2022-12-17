import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from './productType'
import { StoreStatus } from '@starter'

export type ICartState = {
  status: StoreStatus
  items: CartItem[]
}


export type CartItem = {
  product: IProduct
  color: string
  size: string
  quantity: string
}

export type CartProductList = {
  items: CartItem[]
}

const initialState: ICartState = {
  status: 'idle',
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: { payload: CartItem }) => {
      state.items = [...state.items.map(i => ({
        product: i.product,
        color: i.color,
        size: i.size,
        quantity: i.quantity
      })), action.payload]
    },
    delProduct: (state, action: { payload: CartItem }) => {
      state.items = state.items.filter(
        (i) => {
          const { size, quantity, color, product } = action.payload
          return i.size === size && i.quantity === quantity && i.color === color && i.product.id === product.id
        }
      )
    },
  },
})

export const { addProduct, delProduct } = cartSlice.actions

export default cartSlice.reducer
