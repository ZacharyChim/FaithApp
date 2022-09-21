import React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { categories } from '../../data/Categories'
import { ProductStackScreenProps } from '../../types'

const width = Dimensions.get('window').width

// const oneProduct = ({ item }) => (
//   <View style={styles.product}>
//     <TouchableOpacity onPress={() => navigation.navigate('CategoryPage')}>
//       <Text style={styles.productName}>{item.name}</Text>
//       <Image
//         style={styles.productImage}
//         source={require('../../assets/images/products/product.png')}
//       />
//     </TouchableOpacity>
//   </View>
// )

export default function ProductsScreen({
  navigation,
}: ProductStackScreenProps<'ProductsPage'>) {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.product}
            onPress={() =>
              navigation.navigate('CategoryPage', {
                categoryId: item.id,
              })
            }
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Image
              style={styles.productImage}
              source={require('../../assets/images/products/product.png')}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    backgroundColor: 'white',
  },
  productName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productImage: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
