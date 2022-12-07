import cartReducer from './redux/slice/cart'
import classReducer from './redux/slice/class'
import Navigation from './navigation'
import orderReducer from './redux/slice/order'
import useCachedResources from './hooks/useCachedResources'
import userReducer from './redux/slice/user'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { reduxStore } from './redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
// Redux

const { store, persistor } = reduxStore({ reducers: { cart: cartReducer, order: orderReducer, user: userReducer, class: classReducer } })

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
          <StatusBar />
        </SafeAreaProvider>
      </PersistGate>
    )
  }
}
