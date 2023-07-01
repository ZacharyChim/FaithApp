import React from 'react'
import { Button } from '../../components/Button'
import { cartSeletor } from '@slice/cart'
import { CartStackScreenProps } from '../../types'
import { userInfoSeletor } from '@slice/userInfo'
import { useSelector } from 'react-redux'
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { t } from '../../starter/helper/i18n'


const width = Dimensions.get('window').width


export default function CartScreen({
  navigation,
}: CartStackScreenProps<'CartPage'>) {
  const { items } = useSelector(cartSeletor)
  const { user } = useSelector(userInfoSeletor)

  const onPressCheckOut = () => {
    if (!user) {
      Alert.alert(t('pleaseLoginFirst'), undefined, [
        {
          text: 'ok',
          // @ts-ignore
          onPress: () => navigation.navigate('Profile')
        }])
    } else {
      navigation.navigate('InfoPage')
    }
  }

  if (items.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.active}>
              <Text style={styles.circleText}>1</Text>
            </View>
            <View>
              <Text style={styles.topText}>{t('shoppingCart')}</Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>2</Text>
            </View>
            <View>
              <Text style={styles.topText}>{t('fillInformation')}</Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>3</Text>
            </View>
            <View>
              <Text style={styles.topText}>{t('orderConfirmation')}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.mainContainer}>
          {items.map((i, index) => {
            return (
              <View key={`item_${index}`} style={styles.productBox}>
                <View style={styles.productTop}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.productImage}
                      source={{ uri: `https://admin.faithfitnesshk.com${i.product.images.data[0].attributes.url}` }}
                    />
                  </View>
                  <View style={styles.descBox}>
                    <Text style={styles.title}>{i.product.name}</Text>
                    <Text style={styles.smallText}>Color: {i.color}</Text>
                    <Text style={styles.smallText}>Size: {i.size}</Text>
                  </View>
                </View>
                <View style={styles.priceBox}>
                  <View style={styles.quantity}>
                    <Text style={styles.priceText}>{`${t('qty')}:`}</Text>
                    <Text style={styles.priceText}>{i.quantity}</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={[styles.priceText, styles.textBold]}>
                      ${i.product.price}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>
              {`${t('total')} (${items.length} ${t('items')})`}
            </Text>
            <Text style={styles.totalText}>
              $
              {items.reduce((accumulator, product) => {
                return accumulator + product.product.price * Number(product.quantity)
              }, 0)}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          <Button
            style={styles.button}
            title={t('checkout')}
            onPress={onPressCheckOut}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>{t('cartIsEmpty')}</Text>
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
  },
  mainContainer: {
    flex: 9 / 12,
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
  },
  productImage: {
    width: 100,
    height: '100%',
  },
  priceBox: {
    flex: 1,
    flexDirection: 'row',
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
    marginHorizontal: 20,
  },
  bottom: {
    width: '100%',
    marginTop: 10,
    marginLeft: 40,
  },
})
