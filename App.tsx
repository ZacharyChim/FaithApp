import Navigation from './navigation'
import useCachedResources from './hooks/useCachedResources'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { reducers } from './redux'
import { redux } from '@starter'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const { store, persistor } = redux({reducers: reducers})

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
