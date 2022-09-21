import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsScreen from '../screens/ProductStackScreens/ProductsScreen'
import CategoryScreen from '../screens/ProductStackScreens/CategoryScreen'
import ProductScreen from '../screens/ProductStackScreens/ProductScreen'
import { ProductStackParamList } from '../types'

const ProductStack = createNativeStackNavigator<ProductStackParamList>()

function CartStackNavigator() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name='ProductsPage'
        component={ProductsScreen}
        options={{
          title: 'Products',
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
          title: 'Category',
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
      />
    </ProductStack.Navigator>
  )
}

export default ProductStackNavigator
