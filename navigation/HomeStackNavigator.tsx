import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeStackScreens/HomeScreen'
import JoinUsScreen from '../screens/HomeStackScreens/JoinUsScreen'
import TeamScreen from '../screens/HomeStackScreens/TeamScreen'
import TrainerScreen from '../screens/HomeStackScreens/TrainerScreen'
import { HomeStackParamList } from '../types'

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
        }}
      />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
