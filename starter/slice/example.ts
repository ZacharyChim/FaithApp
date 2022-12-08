import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StoreStatus } from '../redux/type'


export type IExampleState = {
  status: StoreStatus
}

export const exampleApiRequest = createAsyncThunk('example/api/action', async () => {})

const initialState: IExampleState = {
  status: 'idle',
}

export const exampleSlice = createSlice({
  name: 'example',
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
      .addCase(exampleApiRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(exampleApiRequest.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(exampleApiRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const exampleActions = exampleSlice.actions
export const exampleSeletor = (state: any) => state.example
