import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type IUserInfoState = {
  status: StoreStatus
  user?: IUser
}

export const userInfoRegister = createAsyncThunk<IUser, IUserInfoRegisterRequest>('userInfo/api/register', async (data, { rejectWithValue }) => {
  const registerResponse = await api().post<IUserInfoRegisterResponse>('/auth/local/register', { ...data })
  if (registerResponse.status === 200 && registerResponse.data) {
    return { ...registerResponse.data.user }
  }
  return rejectWithValue('')
})

export const userInfoLogin = createAsyncThunk<IUser, IUserInfoLoginRequest>('userInfo/api/login', async (data, { rejectWithValue }) => {
  const loginResponse = await api().post<IUserInfoRegisterResponse>('/auth/local', { ...data })
  if (loginResponse.status === 200, loginResponse.data) {
    const { username, email, phone, address, } = loginResponse.data.user
    return {
      username,
      email,
      phone,
      address
    }
  }
  return rejectWithValue('')
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
    logout: (state) => {
      state.status = 'idle'
      state.user = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userInfoRegister.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userInfoRegister.fulfilled, (state, action) => {
        state.status = 'success'
        state.user = action.payload
      })
      .addCase(userInfoRegister.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(userInfoLogin.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userInfoLogin.fulfilled, (state, action) => {
        state.status = 'success'
        state.user = action.payload
      })
      .addCase(userInfoLogin.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const userInfoActions = userInfoSlice.actions
export const userInfoSeletor = (state: { userInfo: IUserInfoState }) => state.userInfo
