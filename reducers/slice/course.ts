import { api, StoreStatus } from '@starter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  ICourse,
  ICourseBookRequest,
  IGetCourse,
  IMyCourse,
  IMyCourseResponse
  } from './courseType'
import { IUserInfoState } from './userInfo'


export type ICourseState = {
  status: StoreStatus
  courses: ICourse[]
  myCourses: IMyCourse[]
}

export const courseGet = createAsyncThunk<ICourse[]>('course/api/get', async () => {
  const response = await api().get<IGetCourse>('/courses', { 'populate[trainer][populate][0]': 'image' })
  return response.data?.data.map((d) => ({ ...d.attributes, id: d.id })) || []
})

export const getMyCourse = createAsyncThunk<IMyCourse[]>('course/api/getMyCourse',async (_, {getState, rejectWithValue}) => {
  const {userInfo} = getState() as {userInfo: IUserInfoState}
  const {user} = userInfo
  if (user) {
    const response = await api().get<IMyCourseResponse>('/bookings', {'populate[course][populate]': 'trainer', 'filters[users_permissions_user][id][$eq]': user.id})
    console.log(response)
    return response.data?.data || []
  }
  return rejectWithValue('')
})

export const courseBook = createAsyncThunk<{}, ICourseBookRequest>('course/api/booking',async ({course, starting, users_permissions_user, date}, {rejectWithValue, dispatch}) => {
  const payload = {
    data: {
      course,
      starting,
      users_permissions_user,
      status: 'pending',
      date
    }
  }
  const bookResponse = await api().post('/bookings', payload)
  if (bookResponse.status === 200) {
    dispatch(getMyCourse())
    return
  }
  return rejectWithValue('')
})

const initialState: ICourseState = {
  status: 'idle',
  courses: [],
  myCourses: []
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
      .addCase(courseBook.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(courseBook.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(courseBook.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(getMyCourse.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getMyCourse.fulfilled, (state, action) => {
        state.status = 'success'
        state.myCourses = action.payload
      })
      .addCase(getMyCourse.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const courseActions = courseSlice.actions
export const courseSeletor = (state: { course: ICourseState }) => state.course
