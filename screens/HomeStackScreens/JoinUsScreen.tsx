import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { Button, FormSelect, FormText } from '@starter'
import { Controller, useForm } from 'react-hook-form'
import { ISexes } from '../../reducers/slice/trainerType'
import { size } from '../../starter/themes/size'
import { Spacing } from '../../starter/component/Spacing'

import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'


interface IForm {
  firstName: string,
  lastName: string,
  age: string,
  sex: ISexes,
  phone: string,
  email: string,
}

const options = [
  { value: 'M', title: 'M' },
  { value: 'F', title: 'F' },
  { value: 'N/A', title: 'N/A' },
]

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function JoinUsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      sex: 'M',
      phone: '',
      email: '',
    },
  })
  const onSubmit = (data: IForm) => {
    console.log(data)
    reset()
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
    console.log(result)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Join us</Text>
      <Text style={styles.title}>Become our trainer</Text>
      <Spacing height={size[4]} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='First name*' onChangeText={onChange} error={errors.firstName && 'This is required.'} />
        )}
        name='firstName'
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='Last name*' onChangeText={onChange} error={errors.lastName && 'This is required.'} />
        )}
        name='lastName'
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='Age*' onChangeText={onChange} error={errors.age && 'This is required.'} />
        )}
        name='age'
      />
      <Controller
        name='sex'
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <FormSelect title={'sex'} onChangeOption={(o) => onChange(o.value)} options={options} error={errors.sex && 'This is required.'} />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='Phone*' onChangeText={onChange} error={errors.phone && 'This is required.'} />
        )}
        name='phone'
      />
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
          <FormText title='Email*' onChangeText={onChange} error={errors.email && 'This is required.'} />
        )}
        name='email'
      />
      <Text>Profile picture*</Text>
      <Button title='Select Document' type='outline' onPress={pickDocument} />
      <Spacing height={size[4]} />
      <Text>Resume*</Text>
      <Button title='Select Document' type='outline' onPress={pickDocument} />
      <Spacing height={size[8]} />
      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      <Spacing height={size[8]}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[4]
  },
  title: {
    fontSize: 20,
  },
})
