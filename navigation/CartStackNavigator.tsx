import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartStackScreens/CartScreen'
import InfoScreen from '../screens/CartStackScreens/InfoScreen'
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
      {/* <CartStack.Screen
        name='ProductPage'
        component={ProductScreen}
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
      /> */}
    </CartStack.Navigator>
  )
}

export default CartStackNavigator
