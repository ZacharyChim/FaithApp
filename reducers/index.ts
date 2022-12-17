import cartReducer from './slice/cart'
import classReducer from './slice/class'
import orderReducer from './slice/order'
import userReducer from './slice/user'
import { categorySlice } from '@slice/category'
import { productSlice } from './slice/product'
import { trainerSlice } from './slice/trainer'

export const reducers = { cart: cartReducer, order: orderReducer, user: userReducer, class: classReducer, trainer: trainerSlice.reducer, category: categorySlice.reducer, product: productSlice.reducer }