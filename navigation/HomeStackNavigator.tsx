import HomeScreen from '../screens/HomeStackScreens/HomeScreen'
import TeamScreen from '../screens/HomeStackScreens/TeamScreen'
import TrainerScreen from '../screens/HomeStackScreens/TrainerScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types'
import { JoinUsScreen } from '../screens/HomeStackScreens/JoinUsScreen'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomePage'
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <HomeStack.Screen
        name='TeamPage'
        component={TeamScreen}
        options={{
          title: 'Our Team',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <HomeStack.Screen
        name='TrainerPage'
        component={TrainerScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <HomeStack.Screen
        name='JoinUsPage'
        component={JoinUsScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
