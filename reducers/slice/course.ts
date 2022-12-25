import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICourse, IGetCourse } from './courseType'

export type ICourseState = {
  status: StoreStatus
  courses: ICourse[]
}

export const courseGet = createAsyncThunk<ICourse[]>('course/api/get', async () => {
  const response = await api().get<IGetCourse>('/courses', { 'populate[trainer][populate][0]': '*' })
  console.log(response)
  return response.data?.data.map((d) => ({ ...d.attributes, id: d.id })) || []
})

const initialState: ICourseState = {
  status: 'idle',
  courses: []
}

export const courseSlice = createSlice({
  name: 'course',
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
      .addCase(courseGet.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(courseGet.fulfilled, (state, action) => {
        state.status = 'success'
        state.courses = action.payload
      })
      .addCase(courseGet.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const courseActions = courseSlice.actions
export const courseSeletor = (state: { course: ICourseState }) => state.course
