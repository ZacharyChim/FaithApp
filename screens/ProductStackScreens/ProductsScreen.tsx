import React, { useEffect } from 'react'
import { categorySeletor, getCategories } from '@slice/category'
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

export default function ProductsScreen({
  navigation,
}: ProductStackScreenProps<'ProductsPage'>) {
  const {categories} = useSelector(categorySeletor)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

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
                name: item.name
              })
            }
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Image
              style={styles.productImage}
              source={{uri: `http://165.22.255.85:1337${item.image.data.attributes.url}`}}
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
