import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type IUserInfoState = {
  status: StoreStatus
  user?: IUser
}

export const userInfoRegister = createAsyncThunk<IUserInfoRegisterRequest, IUserInfoRegisterRequest>('userInfo/api/register', async (data, {rejectWithValue}) => {
  const registerResponse = await api().post<IUserInfoRegisterResponse>('/auth/local/register', {...data})
  if (registerResponse.status === 200 && registerResponse.data) {
    const addClient = await api().post('/clients', {data: {users_permissions_user: registerResponse.data.user.id, ...data}})
    if (addClient.status === 200) {
      return data
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
  },
})

export const userInfoActions = userInfoSlice.actions
export const userInfoSeletor = (state: {userInfo: IUserInfoState}) => state.userInfo
