import Navigation from './navigation'
import useCachedResources from './hooks/useCachedResources'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { reducers } from './reducers'
import { redux, setUpI18n } from '@starter'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
const lan = require('./assets/csvjson.json')

const { store, persistor } = redux({ reducers: reducers, blacklist: [] })

setUpI18n(lan)

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ActionSheetProvider>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Provider store={store}>
              <Navigation />
            </Provider>
            <StatusBar />
          </SafeAreaProvider>
        </PersistGate>
      </ActionSheetProvider>
    )
  }
}
