import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StoreStatus } from '@starter'


export type ITrainerState = {
  status: StoreStatus
}

export const trainerApiRequest = createAsyncThunk('trainer/api/action', async () => {})

const initialState: ITrainerState = {
  status: 'idle',
}

export const trainerSlice = createSlice({
  name: 'trainer',
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
      .addCase(trainerApiRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(trainerApiRequest.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(trainerApiRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const trainerActions = trainerSlice.actions
export const trainerSeletor = (state: any) => state.trainer
