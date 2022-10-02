import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userObject {
  name: string
  phone: number
  email: string
  password: string
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

    // logout: (state, action) => {
    //   state.value = initialState
    // },
  },
})

export const { register } = userSlice.actions

export default userSlice.reducer
