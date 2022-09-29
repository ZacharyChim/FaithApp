import React from 'react'
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
  console.log(products)
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
        <View style={styles.productBox}>
          <View style={styles.productTop}>
            <View style={styles.imageBox}>
              <Image
                style={styles.productImage}
                source={products[0].imageUri}
              />
            </View>
            <View style={styles.descBox}>
              <Text style={styles.title}>{products[0].name}</Text>
              <Text style={styles.smallText}>Color: {products[0].color}</Text>
              <Text style={styles.smallText}>Size: {products[0].size}</Text>
            </View>
          </View>

          <View style={styles.priceBox}>
            <View style={styles.quantity}>
              <Text style={styles.priceText}>Qty:</Text>
              <Text style={styles.priceText}>{products[0].quantity}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>${products[0].price}</Text>
              <Text style={[styles.priceText, styles.textBold]}>
                ${products[0].discountPrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.productBox}>
          <View style={styles.productTop}>
            <View style={styles.imageBox}>
              <Image
                style={styles.productImage}
                source={products[0].imageUri}
              />
            </View>
            <View style={styles.descBox}>
              <Text style={styles.title}>{products[0].name}</Text>
              <Text style={styles.smallText}>Color: {products[0].color}</Text>
              <Text style={styles.smallText}>Size: {products[0].size}</Text>
            </View>
          </View>

          <View style={styles.priceBox}>
            <View style={styles.quantity}>
              <Text style={styles.priceText}>Qty:</Text>
              <Text style={styles.priceText}>{products[0].quantity}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>${products[0].price}</Text>
              <Text style={[styles.priceText, styles.textBold]}>
                ${products[0].discountPrice}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        style={styles.button}
        title='Checkout'
        onPress={() => {
          console.log('Checkout')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flex: 3 / 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#ccc',
  },
  mainContainer: {
    flex: 5 / 10,
    // marginTop: 10,
  },
  button: { flex: 2 / 10 },
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
    fontWeight: 'bold',
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
})
