import AsyncStorage from '@react-native-async-storage/async-storage'
import logger from 'redux-logger'
import { exampleSlice } from '../slice/example'
import { persistReducer, persistStore } from 'redux-persist'
import {
  Reducer,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'


const persistConfig = (blacklist?: string[]) => ({
  key: 'root',
  storage: AsyncStorage,
  blacklist,
})

const persistedReducer = (reducers: { [key: string]: Reducer }, blacklist?: string[]) => persistReducer(persistConfig(blacklist), combineReducers({ ...reducers, example: exampleSlice.reducer }))

export const redux = ({ reducers, blacklist }: { reducers: { [key: string]: Reducer }, blacklist?: string[] }) => {
  const store = configureStore({
    reducer: persistedReducer(reducers, blacklist),
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger],
  })
  const persistor = persistStore(store)
  return { store, persistor }
}

export const presistSelector = (state: any): {rehydrated: boolean} => state._persist
