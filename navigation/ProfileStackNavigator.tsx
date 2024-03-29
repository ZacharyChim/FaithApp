import ContactScreen from '../screens/ProfileStackScreens/ContactScreen'
import DetailScreen from '../screens/ProfileStackScreens/DetailScreen'
import EditScreen from '../screens/ProfileStackScreens/EditScreen'
import LoginScreen from '@screens/ProfileStackScreens/LoginScreen'
import SettingScreen from '../screens/ProfileStackScreens/SettingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../types'
import { t } from '../starter/helper/i18n'

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
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <ProfileStack.Screen
        name='DetailPage'
        component={DetailScreen}
        options={{
          title: t('profile'),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerTitleStyle: {
            color: '#000',
          },
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <ProfileStack.Screen
        name='EditPage'
        component={EditScreen}
        options={{
          title: t('profile'),
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
      <ProfileStack.Screen
        name='ContactPage'
        component={ContactScreen}
        options={{
          title: t('contactUs'),
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
      <ProfileStack.Screen
        name='LoginPage'
        component={LoginScreen}
        options={{
          title: t('login'),
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
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
