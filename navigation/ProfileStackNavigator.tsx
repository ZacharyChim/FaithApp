import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SettingScreen from '../screens/ProfileStackScreens/SettingScreen'
import DetailScreen from '../screens/ProfileStackScreens/DetailScreen'
import EditScreen from '../screens/ProfileStackScreens/EditScreen'
import ContactScreen from '../screens/ProfileStackScreens/ContactScreen'
import { ProfileStackParamList } from '../types'

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='SettingPage'
        component={SettingScreen}
        options={{
          title: 'Setting',
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      <ProfileStack.Screen
        name='DetailPage'
        component={DetailScreen}
        options={{
          title: 'Profile',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      <ProfileStack.Screen
        name='EditPage'
        component={EditScreen}
        options={{
          title: 'Profile',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      <ProfileStack.Screen
        name='ContactPage'
        component={ContactScreen}
        options={{
          title: 'Contact Us',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
