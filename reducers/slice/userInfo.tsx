import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type IUserInfoState = {
  status: StoreStatus
  updateInfoStatus: StoreStatus
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
    const { username, email, phone, address, id } = loginResponse.data.user
    return {
      username,
      email,
      phone,
      address,
      id
    }
  }
  return rejectWithValue('')
})

export const userInfoUpdate = createAsyncThunk<IUser, IUserInfoRegisterRequest>('userInfo/api/update', async (data, {getState, rejectWithValue}) => {
  const {userInfo} = getState() as {userInfo: IUserInfoState}
  let payload: any = {
    username: data.username,
    email: data.email,
    phone: data.phone,
    address: data.address
  }
  if (!!data.password) {
    payload['password'] = data.password
  }
  const response = await api().put<IUser>(`/users/${userInfo.user?.id}`, payload)
  if (response.status === 200 && response.data) {
    return response.data
  }
  return rejectWithValue('')
})

const initialState: IUserInfoState = {
  status: 'idle',
  updateInfoStatus: 'idle'
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
      state.updateInfoStatus = 'idle'
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
      .addCase(userInfoUpdate.pending, (state, action) => {
        state.updateInfoStatus = 'loading'
      })
      .addCase(userInfoUpdate.fulfilled, (state, action) => {
        state.updateInfoStatus = 'success'
        state.user = action.payload
      })
      .addCase(userInfoUpdate.rejected, (state, action) => {
        state.updateInfoStatus = 'failed'
      })
  },
})

export const userInfoActions = userInfoSlice.actions
export const userInfoSeletor = (state: { userInfo: IUserInfoState }) => state.userInfo
