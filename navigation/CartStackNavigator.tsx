import CartScreen from '../screens/CartStackScreens/CartScreen'
import ConfirmScreen from '../screens/CartStackScreens/ConfirmScreen'
import EmptyScreen from '../screens/CartStackScreens/EmptyScreen'
import InfoScreen from '../screens/CartStackScreens/InfoScreen'
import { t } from '../starter/helper/i18n'
import { CartStackParamList } from '../types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
        }}
      />
      <CartStack.Screen
        name='InfoPage'
        component={InfoScreen}
        options={{
          title: t('info'),
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <CartStack.Screen
        name='ConfirmPage'
        component={ConfirmScreen}
        options={{
          title: t('confirm'),
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
      <CartStack.Screen
        name='EmptyPage'
        component={EmptyScreen}
        options={{
          title: 'Empty',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  )
}

export default CartStackNavigator
