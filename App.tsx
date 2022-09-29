import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

// Redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import cartReducer from './redux/features/cart'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
