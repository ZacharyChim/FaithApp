import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userObject {
  name: string
  age: number
  email: string
}

interface UserSlice {
  value: userObject
}

const initialState = { value: { name: 'aa', age: 1, email: 'bb' } } as UserSlice

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },

    logout: (state, action) => {
      state.value = initialState
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
