import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { addAdvice } from '../../reducers/slice/order'
import { Button } from '../../components/Button'
import { CartStackScreenProps } from '../../types'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'


//Redux

let doc

const pickDocument = async () => {
  let doc = await DocumentPicker.getDocumentAsync({})
  // alert(result.uri);
  // console.log(result)
}

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const deliveryOptions = [
  { value: 'store', label: 'Store Pick up' },
  { value: 'sfExperss', label: 'SF Express' },
]
const paymentOptions = [
  { value: 'fps', label: 'FPS' },
  { value: 'bank', label: 'Bank' },
]

const width = Dimensions.get('window').width


export default function InfoScreen({
  navigation,
}: CartStackScreenProps<'ConfirmPage'>) {
  const orders = useSelector((state) => state.order.value)
  const order = orders[orders.length - 1]
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  })

  const onSubmit = (data) => {
    dispatch(addAdvice(doc))
    // console.log(doc)
    reset()
    navigation.navigate('EmptyPage')
  }
  return (
    <View style={styles.container}>
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

      <ScrollView style={styles.mainContainer}>
        <View style={styles.productBox}>
          <Text style={styles.label}>Full name*</Text>
          <TextInput
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
            value={order.name}
          />

          <Text style={styles.label}>Phone*</Text>
          <TextInput
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
            value={order.phone}
          />

          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
            value={order.email}
          />

          <Text style={styles.label}>Delivery Method*</Text>
          <TextInput
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
            value={order.delivery}
          />
          <Text style={styles.moreText}>
            If choosing SF Express, delivery fee to be collected on Receiver
            Paid.
          </Text>

          <Text style={styles.label}>Payment Method:</Text>
          {/* <Controller
            name='payment'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, ref } }) => (
              <RNPickerSelect
                placeholder={{
                  label: 'Choose Payment Method',
                }}
                items={paymentOptions}
                value={value}
                onValueChange={onChange}
                style={pickerSelectStyles}
              />
            )}
          /> */}

          <View style={styles.paymentGroup}>
            <Text style={styles.paymentText}>FPS:</Text>
            <Text style={styles.paymentText}>Bank: HSBC</Text>
            <Text style={styles.paymentText}>FPS Identifier: 33333333</Text>
            <Text style={styles.paymentText}>Payment send to: Faith Cxxxx</Text>
            <Image
              style={styles.payment}
              source={require('../../assets/images/fps.png')}
            />
          </View>

          <View style={styles.paymentGroup}>
            <Text style={styles.paymentText}>Payme:</Text>
            <Text style={styles.paymentText}>Paycode to Payme</Text>
            <Text
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL('http://payme.hsbc/faith')}
            >
              http://payme.hsbc/faith
            </Text>
            <Image
              style={styles.payment}
              source={require('../../assets/images/payme.png')}
            />
          </View>

          <View style={styles.paymentGroup}>
            <Text style={styles.paymentText}>Bank: HSBC</Text>
            <Text style={styles.paymentText}>
              Account number：033 333333 333
            </Text>
            <Text style={styles.paymentText}>Account name：Faith Cxxxxxxx</Text>
          </View>

          {/* {errors.payment && <Text>This is required.</Text>} */}
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
          <Button title='Upload' style={styles.button} onPress={pickDocument} />

          <Text style={styles.label}>Remark</Text>
          <View style={styles.textAreaContainer}>
            {order.remark === '' ? (
              <TextInput
                style={styles.textArea}
                value='N/A'
                editable={false}
                selectTextOnFocus={false}
              />
            ) : (
              <TextInput
                style={styles.textArea}
                value={order.remark}
                editable={false}
                selectTextOnFocus={false}
              />
            )}
          </View>
          <Button
            title='Submit'
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
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
  button: { flex: 2 / 10, alignSelf: 'center', width: '95%', marginTop: 10 },
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
  moreText: {
    fontSize: 14,
    color: '#757575',
    marginHorizontal: 10,
    marginBottom: 10,
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

  label: {
    marginLeft: 10,
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#BDBDBD',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  paymentGroup: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  payment: { width: 100, height: 120 },
  paymentText: { marginBottom: 5 },
  textAreaContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    // padding: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    // height: 150,
    justifyContent: 'flex-start',
    backgroundColor: '#ccc',
    padding: 5,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // fontSize: 16,
    width: '90%',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 10,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
})
