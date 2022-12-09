import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { addOrder } from '../../reducers/slice/order'
import { Button } from '../../components/Button'
import { CartStackScreenProps } from '../../types'
import { Controller, useForm } from 'react-hook-form'
import { number } from 'prop-types'
import { register } from '../../reducers/slice/user'
import { useDispatch, useSelector } from 'react-redux'

import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
//Redux


let upload

const pickDocument = async () => {
  upload = await DocumentPicker.getDocumentAsync({})
  // alert(result.uri);
  // console.log(upload)
}

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const deliveryOptions = [
  { value: 'Store pick up', label: 'Store pick up' },
  { value: 'SF Express', label: 'SF Express' },
]
const paymentOptions = [
  { value: 'fps', label: 'FPS' },
  { value: 'bank', label: 'Bank' },
]

const width = Dimensions.get('window').width


export default function InfoScreen({
  navigation,
}: CartStackScreenProps<'InfoPage'>) {
  const products = useSelector((state) => state.cart.value)
  const orders = useSelector((state) => state.order.value)
  const users = useSelector((state) => state.user.value)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      age: '',
      delivery: 'store',
      payment: 'fps',
      phone: '',
      email: '',
      remark: '',
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const order = {
      orderId: orders.length + 1,
      name: data.name,
      phone: data.phone,
      email: data.email,
      delivery: data.delivery,
      advice: '',
      remark: data.remark,
    }
    const user = {
      userId: users.length + 1,
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: '',
      isLogin: true,
    }
    dispatch(addOrder(order))
    dispatch(register(user))
    reset()
    navigation.navigate('ConfirmPage')
  }
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>1</Text>
            </View>
            <View>
              <Text style={styles.topText}>Shopping</Text>
              <Text style={styles.topText}>Cart</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.step}>
          <View style={styles.active}>
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
          <Text style={styles.label}>Full name*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder=''
              />
            )}
            name='name'
          />
          {errors.fullName && <Text>This is required.</Text>}
          <Text style={styles.label}>Phone*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder=''
              />
            )}
            name='phone'
          />
          {errors.phone && <Text>This is required.</Text>}
          <Text style={styles.label}>Email*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: EMAIL_REGEX,
                message: 'Not a valid email',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder=''
              />
            )}
            name='email'
          />
          {errors.email && <Text>Email is invalid.</Text>}
          <Text style={styles.label}>Delivery Method*</Text>
          <Controller
            name='delivery'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, ref } }) => (
              <RNPickerSelect
                placeholder={{
                  label: 'Choose Delivery Method',
                }}
                items={deliveryOptions}
                value={value}
                onValueChange={onChange}
                style={pickerSelectStyles}
              />
            )}
          />
          <Text style={styles.moreText}>
            If choosing SF Express, delivery fee to be collected on Receiver
            Paid.
          </Text>
          {errors.delivery && <Text>This is required.</Text>}

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

          {/* {errors.payment && <Text>This is required.</Text>} */}

          <Text style={styles.label}>Remark</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder=''
              />
            )}
            name='remark'
          />

          <Button title='Submit' onPress={handleSubmit(onSubmit)} />
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
    flex: 2 / 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#ccc',
    marginTop: 40,
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
    borderColor: 'gray',
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  paymentGroup: {
    marginHorizontal: 10,
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
    // backgroundColor: '#ccc',
    padding: 8,
    fontSize: 16,
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
