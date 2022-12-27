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
  Text
  } from '@starter'
import { cartSeletor, createOrder } from '@slice/cart'
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


export default function InfoScreen({
  navigation,
}: CartStackScreenProps<'ConfirmPage'>) {
  const [image, setImage] = useState<IImageOutput | undefined>(undefined)
  const dispatch = useDispatch<any>()
  const { user } = useSelector(userInfoSeletor)
  const { info, items, status } = useSelector(cartSeletor)

  useEffect(() => {
    if (status === 'success') {
      Alert.alert('Create order success', 'We will proceed your order very soon. Thank you', [{text: 'ok', onPress: () => {
        navigation.goBack()
        navigation.goBack()
        navigation.goBack()
      }}])
    } else if (status === 'failed') {
      
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
            <View style={styles.circle}>
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
            <View style={styles.active}>
              <Text style={styles.circleText}>3</Text>
            </View>
            <View>
              <Text style={styles.topText}>Order</Text>
              <Text style={styles.topText}>Confirmation</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <SectionWrapper style={{ margin: size[4], padding: size[4], backgroundColor: colors.white }}>
          <FormText title='Full name*' editable={false} onChangeText={() => { }} text={user?.username} />
          <FormText title='Phone*' editable={false} onChangeText={() => { }} text={user?.phone} />
          <FormText title='Email*' editable={false} onChangeText={() => { }} text={user?.email} />
          <FormText title='Delivery Method*' editable={false} onChangeText={() => { }} text={info?.delivery} />
          <FormText title='Total Price' editable={false} onChangeText={() => { }} text={`$${items.reduce((accumulator, product) => { return accumulator + product.product.price * Number(product.quantity) }, 0)}`} />
          <Text style={styles.moreText}>
            If choosing SF Express, delivery fee to be collected on Receiver
            Paid.
          </Text>
          <Text.H1>Payment Method:</Text.H1>
          <>
            <Text.H2>FPS</Text.H2>
            <Text.Caption >Bank: HSBC</Text.Caption>
            <Text.Caption >FPS Identifier: 33333333</Text.Caption>
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

          <Text style={styles.moreText}>
            Please settle the payment by ATM/FPS/PAYME in 24 hours, and upload
            the payment of Deposit Advice to confirm your payment.
          </Text>
          <Text style={styles.moreText}>
            Please make sure the payment of Deposit Advice clearly shows the
            deposit date, time, account number and name, otherwise order may be
            treated as invalid.
          </Text>

          <Text style={styles.label}>Payment of Deposit Advice * </Text>
          <Spacing height={size[4]} />
          <FormImage title='Payment Proof' placeHolder='Choose...' onPickImage={setImage} error={!image ? 'This is required.' : undefined} />
          <FormText title='Remark' text={info?.remark || 'N/A'} editable={false} onChangeText={() => { }} multiline={!!info?.remark} />
          <Button
            title='Submit'
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
