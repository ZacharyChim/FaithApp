import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { addInfo } from '@slice/cart'
import { Button } from '../../components/Button'
import { CartStackScreenProps } from '../../types'
import {
  colors,
  FormSelect,
  FormText,
  SectionWrapper,
  size,
  Spacing
  } from '@starter'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoSeletor } from '@slice/userInfo'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


const deliveryOptions = [
  { value: 'Store pick up', title: 'Store pick up' },
  { value: 'SF Express', title: 'SF Express' },
]

interface IForm {
  name: string
  delivery: 'Store pick up' | 'SF Express',
  phone: string
  email: string
  remark?: string
}


export default function InfoScreen({
  navigation,
}: CartStackScreenProps<'InfoPage'>) {
  const { user } = useSelector(userInfoSeletor)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      name: user?.username,
      delivery: 'SF Express',
      phone: user?.phone,
      email: user?.email,
      remark: '',
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data: IForm) => {
    dispatch(addInfo({ remark: data.remark, delivery: data.delivery }))
    navigation.navigate('ConfirmPage')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* step bar */}
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

        {/* Form */}

        <Spacing height={size[10]} />
        <SectionWrapper style={{ backgroundColor: colors.white, padding: size[4], margin: size[4] }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormText title='User name*' text={value} editable={false} onChangeText={onChange} />
            )}
            name='name'
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormText title='Phone*' text={value} editable={false} onChangeText={onChange} />
            )}
            name='phone'
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormText title='Email*' text={value} editable={false} onChangeText={onChange} />
            )}
            name='email'
          />
          <Controller
            name='delivery'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, ref } }) => (
              <FormSelect title={'Delivery Method*'} text={value} options={deliveryOptions} onChangeOption={(o) => onChange(o.value)} error={errors.delivery && 'This is required.'} />
            )}
          />
          <Text style={styles.moreText}>
            If choosing SF Express, delivery fee to be collected on Receiver
            Paid.
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormText title='Remark' text={value} onChangeText={onChange} multiline />
            )}
            name='remark'
          />
          <Button title='Submit' onPress={handleSubmit(onSubmit)} />
        </SectionWrapper>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  stepContainer: {
    flex: 2 / 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moreText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  payment: { width: 100, height: 120 },
})
