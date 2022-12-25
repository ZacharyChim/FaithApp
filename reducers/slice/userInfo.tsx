import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StoreStatus } from '@starter'


export type IUserInfoState = {
  status: StoreStatus
  user?: IUser
}

export const userInfoRegister = createAsyncThunk<{}, IUserInfoRegisterRequest>('userInfo/api/register', async () => {

})

const initialState: IUserInfoState = {
  status: 'idle',
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
    resetLogin: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userInfoRegister.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userInfoRegister.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(userInfoRegister.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const userInfoActions = userInfoSlice.actions
export const userInfoSeletor = (state: {userInfo: IUserInfoState}) => state.userInfo
