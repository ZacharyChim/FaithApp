import React from 'react'
import uuid from 'react-native-uuid'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

import { CartStackScreenProps } from '../../types'

const width = Dimensions.get('window').width

//Redux
import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

export default function CartScreen({
  navigation,
}: CartStackScreenProps<'CartPage'>) {
  const products = useSelector((state) => state.cart.value)
  if (products.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.active}>
              <Text style={styles.circleText}>1</Text>
            </View>
            <View>
              <Text style={styles.topText}>Shopping</Text>
              <Text style={styles.topText}>Cart</Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>2</Text>
            </View>
            <View>
              <Text style={styles.topText}>Fill</Text>
              <Text style={styles.topText}>Information</Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>3</Text>
            </View>
            <View>
              <Text style={styles.topText}>Order</Text>
              <Text style={styles.topText}>Confirmation</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.mainContainer}>
          {products.map((product) => {
            return (
              <View key={uuid.v4()} style={styles.productBox}>
                <View style={styles.productTop}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.productImage}
                      source={product.imageUri}
                    />
                  </View>
                  <View style={styles.descBox}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.smallText}>Color: {product.color}</Text>
                    <Text style={styles.smallText}>Size: {product.size}</Text>
                  </View>
                </View>

                <View style={styles.priceBox}>
                  <View style={styles.quantity}>
                    <Text style={styles.priceText}>Qty:</Text>
                    <Text style={styles.priceText}>{product.quantity}</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.priceText}>${product.price}</Text>
                    <Text style={[styles.priceText, styles.textBold]}>
                      ${product.discountPrice}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>
              Total ({products.length} Items)
            </Text>
            <Text style={styles.totalText}>
              $
              {products.reduce((accumulator, product) => {
                return accumulator + product.discountPrice * product.quantity
              }, 0)}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          <Button
            style={styles.button}
            title='Checkout'
            onPress={() => navigation.navigate('InfoPage')}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Your cart is empty.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flex: 3 / 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
    // backgroundColor: '#ccc',
  },
  mainContainer: {
    flex: 9 / 12,
    // marginTop: 10,
  },
  totalBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    width: width - 40,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  step: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    // flex: 1,
    margin: 10,
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#757575',
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
  },
  topText: {
    textAlign: 'center',
  },

  title: {
    fontSize: 20,

    marginBottom: 8,
  },
  smallText: {
    fontSize: 16,
    // alignSelf: 'flex-end',
    marginTop: 5,
    color: '#757575',
  },

  productBox: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
    padding: 10,
    width: width - 40,
    borderRadius: 5,
  },

  productTop: {
    flex: 1,
    flexDirection: 'row',
  },
  imageBox: {
    flex: 1,
    height: 100,
    margin: 5,
  },
  descBox: {
    flex: 2,
    margin: 5,
    // height: 100,
    // width: '100%',
    // flexDirection: 'column',
  },
  productImage: {
    width: 100,
    height: '100%',
  },
  priceBox: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 15,
    // padding: 5,
  },
  quantity: {
    flex: 1,
    alignItems: 'center',
  },
  price: {
    flex: 1,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    margin: 5,
  },
  textBold: {
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 20,
  },
  button: {
    width: '90%',
  },
  top: {
    width: '100%',
    // alignItems: 'stretch',
    // marginTop: 100,
    marginHorizontal: 20,
  },
  bottom: {
    width: '100%',
    marginTop: 10,
    marginLeft: 40,
    // alignItems: 'stretch',
  },
})
