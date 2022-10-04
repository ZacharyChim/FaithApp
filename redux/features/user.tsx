import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userObject {
  userId: number
  name: string
  phone: number
  email: string
  password: string
  isLogin: boolean
}

interface UserSlice {
  value: userObject
}

const initialState = {
  value: [] as userObject[],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.value.push(action.payload)
    },

    logout: (state, action) => {
      const index = state.value.findIndex(
        (user) => user.userId === action.payload
      )
      let old = state.value[index]
      old.isLogin = false
      let oldUsers = state.value
      oldUsers[index] = old
      state.value = oldUsers
    },
    updateUser: (state, action) => {
      const index = state.value.findIndex(
        (user) => user.userId === action.payload.userId
      )

      let oldUsers = state.value
      oldUsers[index] = action.payload
      state.value = oldUsers
    },
  },
})

export const { register, logout, updateUser } = userSlice.actions

export default userSlice.reducer
