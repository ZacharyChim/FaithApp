import { createSlice } from '@reduxjs/toolkit'

type ILanguage = 'en' | 'zh' | 'zh_CN'

export type ISettingState = {
    language: ILanguage
}

const initialState: ISettingState = {
    language: 'zh'
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    reset: (state) => {
      state.language = 'en'
    },
    changeLanguage: (state, {payload} : {payload: ILanguage}) => {
      state.language = payload
    },
  }
})

export const settingActions = settingSlice.actions
export const settingSeletor = (state: any) => state.setting as ISettingState
