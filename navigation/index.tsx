import * as React from 'react'
import BookingStackNavigator from './BookingStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import HomeStackNavigator from './HomeStackNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import ProductStackNavigator from './ProductStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import { t } from '../starter/helper/i18n'

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#000',
        tabBarInactiveBackgroundColor: '#000',
        tabBarStyle: { backgroundColor: '#000' },
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: t('home'),
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name='Products'
        component={ProductStackNavigator}
        options={{
          title: t('product'),
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name='Booking'
        component={BookingStackNavigator}
        options={{
          title: t('booking'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='hand-rock-o' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Cart'
        component={CartStackNavigator}
        options={{
          title: t('cart'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='shopping-cart' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileStackNavigator}
        options={{
          title: t('profile'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='user-circle-o' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
