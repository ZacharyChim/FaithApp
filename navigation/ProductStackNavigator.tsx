import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsScreen from '../screens/ProductStackScreens/ProductsScreen'
import CategoryScreen from '../screens/ProductStackScreens/CategoryScreen'
import ProductScreen from '../screens/ProductStackScreens/ProductScreen'
import { ProductStackParamList } from '../types'

const ProductStack = createNativeStackNavigator<ProductStackParamList>()

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name='ProductsPage'
        component={ProductsScreen}
        options={{
          title: 'Products',
          headerShown: false,
        }}
      />
      <ProductStack.Screen
        name='CategoryPage'
        component={CategoryScreen}
        options={{
          title: 'Category',
        }}
      />
      <ProductStack.Screen
        name='ProductPage'
        component={ProductScreen}
        options={{
          title: '',
        }}
      />
    </ProductStack.Navigator>
  )
}

export default ProductStackNavigator
