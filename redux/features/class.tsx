import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageSourcePropType } from 'react-native'

const trainer1 = require('../../assets/images/trainers/trainer.png')
const trainer2 = require('../../assets/images/trainers/course.png')

type Class = {
  id: number
  title: string
  dateTime: string
  duration: string
  trainer: string
  image: ImageSourcePropType
  users: number[]
}

// interface ClassSlice {
//   value: Class
// }

const initialState = {
  value: {
    '2022-10-05': [
      {
        id: 1,
        title: '16:00泰拳小組訓練',
        dateTime: '2022-10-05T08:00:00+08:00',
        duration: '60min',
        trainer: 'Mary',
        image: trainer1,
        isFull: false,
        users: [],
      },
      {
        id: 2,
        title: '17:15泰拳小組訓練',
        dateTime: '2022-10-05T09:15:00+08:00',
        duration: '60min',
        trainer: '阿陳',
        image: trainer2,
        isFull: false,
        users: [1],
      },
      {
        id: 3,
        title: '18:30泰拳小組訓練',
        dateTime: '2022-10-05T10:30:00+08:00',
        duration: '60min',
        trainer: '阿陳',
        image: trainer2,
        isFull: true,
        users: [],
      },
    ],
  },
}

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    addClass: (state, action) => {
      let dateOnly = action.payload.dateTime.split('T', 1)[0]
      // console.log(dateOnly)

      // if (dateOnly in state) {
      //   console.log('Key existed')
      // } else {
      //   console.log('Key does not exist')
      // }

      // state.value.push(action.payload)
    },

    addStudent: (state, action) => {
      let classes = state.value
      let date = action.payload.date
      let classID = action.payload.classId
      let oneDay = classes[date]

      let old = oneDay.find((item) => item.id === action.payload.classId)
      old.users.push(action.payload.studentId)

      let index = oneDay.findIndex(({ id }) => {
        return id === classID
      })

      classes[date][index] = old
      state.value = classes
      // console.log(state.value)
    },
    removeStudent: (state, action) => {
      let classes = state.value
      let date = action.payload.date
      let classID = action.payload.classId
      let oneDay = classes[date]

      let old = oneDay.find((item) => item.id === action.payload.classId)

      let index = oneDay.findIndex(({ id }) => {
        return id === classID
      })
      old.users.splice(index, 1)

      classes[date][index] = old
    },
  },
})

export const { addClass, addStudent, removeStudent } = classSlice.actions

export default classSlice.reducer
