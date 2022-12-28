import cartReducer from './slice/cart'
import classReducer from './slice/class'
import orderReducer from './slice/order'
import { categorySlice } from '@slice/category'
import { courseSlice } from './slice/course'
import { productSlice } from './slice/product'
import { trainerSlice } from './slice/trainer'
import { userInfoSlice } from './slice/userInfo'

export const reducers = {
    cart: cartReducer,
    order: orderReducer,
    class: classReducer,
    trainer: trainerSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    course: courseSlice.reducer,
    userInfo: userInfoSlice.reducer
}