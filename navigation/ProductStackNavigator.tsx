import CategoryScreen from '../screens/ProductStackScreens/CategoryScreen'
import ProductScreen from '../screens/ProductStackScreens/ProductScreen'
import ProductsScreen from '../screens/ProductStackScreens/ProductsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProductStackParamList } from '../types'
import { t } from '../starter/helper/i18n'

const ProductStack = createNativeStackNavigator<ProductStackParamList>()

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name='ProductsPage'
        component={ProductsScreen}
        options={{
          title: t('product'),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      <ProductStack.Screen
        name='CategoryPage'
        component={CategoryScreen}
        options={{
          title: t('category'),
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
      <ProductStack.Screen
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
          headerBackTitle: '',
          headerTintColor: '#000'
        }}
      />
    </ProductStack.Navigator>
  )
}

export default ProductStackNavigator
