import { api, IImageOutput, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  ICartInfo,
  ICartItem,
  ICreateOrderRequest,
  IUploadImageResponse
  } from './cartType'
import { IUserInfoState } from './userInfo'


export type ICartState = {
  status: StoreStatus
  items: ICartItem[]
  info?: ICartInfo
}



const initialState: ICartState = {
  status: 'idle',
  items: []
}



export const createOrder = createAsyncThunk<{}, ICreateOrderRequest>('cart/api/createOrder', async ({image}, {getState}) => {
  const formData = new FormData()
  // @ts-ignore
  formData.append('files', image)
  const uploadFileResponse = await api().post<IUploadImageResponse[]>('/upload', formData)
  console.log({uploadFileResponse})
  if (uploadFileResponse.status === 200) {
    const {userInfo, cart} = getState() as {userInfo : IUserInfoState, cart: ICartState}
    if (userInfo.user) {
      const {username, phone, email, address, id} = userInfo.user
      const payload = {
        data: {
          name: username,
          phone,
          email,
          address,
          remark: cart.info?.remark,
          payment_proof: uploadFileResponse.data?.[0].id,
          users_permissions_user: id,
          status: "pending",
          items: cart.items.map(i => ({
            item: i.product.name,
            info: `${i.color} | ${i.size}`,
            price: i.product.price,
            amount: i.quantity,
            unit_price: Number(i.quantity) * i.product.price
          }))
        }
      }
      const createOrderResponse = await api().post('/orders', payload)
      console.log(createOrderResponse)
    }
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
    addProduct: (state, action: { payload: ICartItem }) => {
      state.items = [...state.items.map(i => ({
        product: i.product,
        color: i.color,
        size: i.size,
        quantity: i.quantity
      })), action.payload]
    },
    delProduct: (state, action: { payload: ICartItem }) => {
      state.items = state.items.filter(
        (i) => {
          const { size, quantity, color, product } = action.payload
          return i.size === size && i.quantity === quantity && i.color === color && i.product.id === product.id
        }
      )
    },
    addInfo: (state, action: { payload: ICartInfo }) => {
      state.info = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'success'
        state.info = undefined
        state.items = []
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const { addProduct, delProduct, addInfo } = cartSlice.actions

export default cartSlice.reducer

export const cartSeletor = (state: { cart: ICartState }) => state.cart
