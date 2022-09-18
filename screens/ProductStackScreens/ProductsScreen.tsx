import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native'

import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'

import { categories } from '../../data/Categories'

const width = Dimensions.get('window').width

const oneProduct = ({ item }) => (
  <View style={styles.product}>
    <Text style={styles.productName}>{item.name}</Text>
    <Image
      style={styles.productImage}
      source={require('../../assets/images/products/product.png')}
    />
  </View>
)

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={oneProduct}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
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
