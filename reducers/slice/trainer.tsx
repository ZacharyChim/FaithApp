import { api } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ITrainer, ITrainerAttributes, ITrainerRequest } from './trainerType'
import { StoreStatus } from '@starter'


export interface ITrainerState {
  status: StoreStatus
  trainers: ITrainer[]
}

interface ITrainerResponse {
  data: {
    attributes: ITrainerAttributes
    id: number
  }[]
}

export const registerTrainer = createAsyncThunk<{}, ITrainerRequest>('trainer/post', async (payload, { rejectWithValue }) => {
  const response = await api().post('/trainers', { data: payload })
  console.log(response)
})

export const getTrainer = createAsyncThunk('trainer/get', async (_, { rejectWithValue }) => {
  const response = await api().get<ITrainerResponse>('/trainers', { populate: '*', 'filters[status][$eq]': 'accepted' })
  const trainers = response.data?.data.map(d => ({ ...d.attributes, id: d.id }))
  if (trainers) {
    return trainers
  } else {
    return rejectWithValue('')
  }
})

const initialState: ITrainerState = {
  status: 'idle',
  trainers: []
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
      .addCase(getTrainer.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getTrainer.fulfilled, (state, action) => {
        state.status = 'idle'
        state.trainers = action.payload
      })
      .addCase(getTrainer.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const trainerActions = trainerSlice.actions
export const trainerSeletor = (state: any) => state.trainer as ITrainerState
