import React, { useEffect, useState } from 'react'
import {
  Button,
  colors,
  FormImage,
  FormText,
  IImageOutput,
  LoadingLottie,
  SectionWrapper,
  size,
  Spacing,
  t,
  Text
  } from '@starter'
import { cartSeletor, cartSlice, createOrder } from '@slice/cart'
import { CartStackScreenProps } from '../../types'
import { useDispatch } from 'react-redux'
import { userInfoSeletor } from '@slice/userInfo'
import { useSelector } from 'react-redux'
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { orderSlice } from '@slice/order'


export default function InfoScreen({
  navigation,
}: CartStackScreenProps<'ConfirmPage'>) {
  const [image, setImage] = useState<IImageOutput | undefined>(undefined)
  const dispatch = useDispatch<any>()
  const { user } = useSelector(userInfoSeletor)
  const { info, items, status } = useSelector(cartSeletor)

  useEffect(() => {
    if (status === 'success') {
      Alert.alert(t('createOrderSuccess'), t('createOrderSuccessDescription'), [{text: 'ok', onPress: () => {
        dispatch(cartSlice.actions.resetStatus())
        navigation.goBack()
        navigation.goBack()
        navigation.goBack()
      }}])
    } else if (status === 'failed') {
      Alert.alert(t('createOrderFailed'), t('tryAgainLater'), [{text: 'ok'}])
    }
  }, [status])

  const onSubmit = () => {
    if (image) {
      dispatch(createOrder({ image }))
    }
  }

  return (
    <View style={{flex: 1}}>
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        {/* step bar */}
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
            <View style={styles.active}>
              <Text style={styles.circleText}>2</Text>
            </View>
            <View>
              <Text style={styles.topText}>{t('fillInformation')}</Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.active}>
              <Text style={styles.circleText}>3</Text>
            </View>
            <View>
              <Text style={styles.topText}>{t('orderConfirmation')}</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <SectionWrapper style={{ margin: size[4], padding: size[4], backgroundColor: colors.white }}>
          <FormText title={t('fullName*')} editable={false} onChangeText={() => { }} text={user?.username} />
          <FormText title={t('phone*')} editable={false} onChangeText={() => { }} text={user?.phone} />
          <FormText title={t('email*')} editable={false} onChangeText={() => { }} text={user?.email} />
          <FormText title={t('deliveryMethod*')} editable={false} onChangeText={() => { }} text={info?.delivery} />
          <FormText title={t('totalPrice')} editable={false} onChangeText={() => { }} text={`$${items.reduce((accumulator, product) => { return accumulator + product.product.price * Number(product.quantity) }, 0)}`} />
          <Text style={styles.moreText}>{t('sfPaymentDescrription')}</Text>
          <Text.H1>{`${t('paymentMethod')}:`}</Text.H1>
          <>
            <Text.H2>FPS</Text.H2>
            <Text.Caption >Bank: HSBC</Text.Caption>
            <Text.Caption >FPS ID: 6018 7633</Text.Caption>
            <Text.Caption >Payment send to: Faith Cxxxx</Text.Caption>
            <Spacing height={size[2]} />
            <Image
              style={styles.payment}
              source={require('../../assets/images/fps.png')}
            />
          </>
          <Spacing height={size[8]} />
          <>
            <Text.H2 style={styles.paymentText}>Payme:</Text.H2>
            <Text.Caption style={styles.paymentText}>Paycode to Payme</Text.Caption>
            <Text.Caption
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL('http://payme.hsbc/faith')}
            >
              http://payme.hsbc/faith
            </Text.Caption>
            <Image
              style={styles.payment}
              source={require('../../assets/images/payme.png')}
            />
          </>
          <Spacing height={size[8]} />
          <>
            <Text.H2 style={styles.paymentText}>HSBC</Text.H2>
            <Text.Caption style={styles.paymentText}>
              Account number：033 333333 333
            </Text.Caption>
            <Text.Caption style={styles.paymentText}>Account name：Faith Cxxxxxxx</Text.Caption>
          </>
          <Spacing height={size[8]} />

          <Text style={styles.moreText}>{t('paymentDescription')}</Text>
          <Text style={styles.moreText}>{t('paymentDescription2')}</Text>
          <Text style={styles.label}>{t('depositEvidence*')}</Text>
          <Spacing height={size[4]} />
          <FormImage title={t('paymentProof')} placeHolder={t('choose')} onPickImage={setImage} error={!image ? t('thisIsRequired') : undefined} />
          <FormText title={t('remark')} text={info?.remark || 'N/A'} editable={false} onChangeText={() => { }} multiline={!!info?.remark} />
          <Button
            title={t('submit')}
            onPress={onSubmit}
          />
        </SectionWrapper>
      </View>
    </ScrollView>
    <LoadingLottie isIndicator isVisible={status === 'loading'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  stepContainer: {
    flex: 3 / 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainContainer: {
    flex: 5 / 10,
  },
  step: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
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
  moreText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },

  label: {
    marginVertical: 5,
  },
  payment: { width: 100, height: 120 },
  paymentText: { marginBottom: 5 },
})
