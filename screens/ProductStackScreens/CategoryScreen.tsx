import React, { useEffect } from 'react'
import { getProducts, productSeletor } from '@slice/product'
import { ProductStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


const width = Dimensions.get('window').width
let isDiscount = false
export default function CategoryScreen({
  navigation,
  route,
}: ProductStackScreenProps<'CategoryPage'>) {
  const dispatch = useDispatch<any>()
  const { products } = useSelector(productSeletor)

  useEffect(() => {
    dispatch(getProducts({ id: route.params.id }))
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={products}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('ProductPage', { id: item.id })}
          >
            <View style={styles.productContainer}>
              <Image style={styles.image} source={{ uri: `https://admin.faithfitnesshk.com${item.images.data[0].attributes.url}` }} />
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
              <Text numberOfLines={2} style={styles.desc}>
                {item.description.length > 30
                  ? item.description.substring(0, 29) + '...'
                  : item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    // alignItems: 'center',

    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: 160,
    height: 260,
    // flex: 1 / 2,
    margin: 5,
    padding: 10,
  },
  priceContainer: {
    height: 38,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
    lineHeight: 16,
  },
  image: {
    width: 140,
    height: 160,
    alignSelf: 'center',
    marginBottom: 10,
    // resizeMode: 'contain',
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
