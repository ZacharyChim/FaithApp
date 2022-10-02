import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartStackScreens/CartScreen'
import InfoScreen from '../screens/CartStackScreens/InfoScreen'
import ConfirmScreen from '../screens/CartStackScreens/ConfirmScreen'
import EmptyScreen from '../screens/CartStackScreens/EmptyScreen'
// import ProductScreen from '../screens/ProductStackScreens/ProductScreen'
import { CartStackParamList } from '../types'

const CartStack = createNativeStackNavigator<CartStackParamList>()

function CartStackNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name='CartPage'
        component={CartScreen}
        options={{
          title: 'Cart',
          headerShown: false,

          // headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          // headerTitleStyle: {
          //   color: '#000',
          // },
        }}
      />
      <CartStack.Screen
        name='InfoPage'
        component={InfoScreen}
        options={{
          title: 'Info',
          headerShown: false,

          // headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          // headerTitleStyle: {
          //   color: '#000',
          // },
        }}
      />
      <CartStack.Screen
        name='ConfirmPage'
        component={ConfirmScreen}
        options={{
          title: 'Confirm',
          headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          // headerTitleStyle: {
          //   color: '#000',
          // },
        }}
      />
      <CartStack.Screen
        name='EmptyPage'
        component={EmptyScreen}
        options={{
          title: 'Empty',
          headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          // headerTitleStyle: {
          //   color: '#000',
          // },
        }}
      />
    </CartStack.Navigator>
  )
}

export default CartStackNavigator
