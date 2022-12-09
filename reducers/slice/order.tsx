import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Order = {
  orderId: number
  name: string
  phone: number
  email: string
  delivery: string
  advice: string
  remark: string
}

interface OrderSlice {
  value: Order
}

const initialState = {
  value: [] as Order[],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.value.push(action.payload)
    },
    addAdvice: (state, action) => {
      state.value[state.value.length - 1].advice = action.payload
    },
  },
})

export const { addOrder, addAdvice } = orderSlice.actions

export default orderSlice.reducer
