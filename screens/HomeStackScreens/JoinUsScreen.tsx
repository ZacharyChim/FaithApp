import * as DocumentPicker from 'expo-document-picker'
import React, { useState } from 'react'
import {
  Button,
  FormImage,
  FormSelect,
  FormText,
  IImageOutput
  } from '@starter'
import { Controller, useForm } from 'react-hook-form'
import { ISexes } from '../../reducers/slice/trainerType'
import { registerTrainer } from '@slice/trainer'
import { size } from '../../starter/themes/size'
import { Spacing } from '../../starter/component/Spacing'
import { uploadFile } from '../../helpers/fileHelper'
import { useDispatch } from 'react-redux'

import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'


interface IForm {
  first_name: string,
  last_name: string,
  age: string,
  sex: ISexes,
  phone: string,
  email: string,
  profile: IImageOutput
  resume: IImageOutput
  description: string
}

const options = [
  { value: 'M', title: 'M' },
  { value: 'F', title: 'F' },
  { value: 'N/A', title: 'N/A' },
]

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function JoinUsScreen() {
  const dispatch = useDispatch<any>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      first_name: '',
      last_name: '',
      age: '',
      sex: 'M',
      phone: '',
      email: '',
      profile: undefined,
      resume: undefined,
      description: ''
    },
  })
  const onSubmit = async (data: IForm) => {
    const profileId = await uploadFile(data.profile)
    const resumeId = await uploadFile(data.resume)
    dispatch(registerTrainer({
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      sex: data.sex,
      description: data.description,
      image: profileId,
      resume: resumeId,
      status: 'pending',
      name: `${data.last_name} ${data.first_name}`
    }))
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
          <FormText title='First name*' onChangeText={onChange} error={errors.first_name && 'This is required.'} />
        )}
        name='first_name'
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='Last name*' onChangeText={onChange} error={errors.last_name && 'This is required.'} />
        )}
        name='last_name'
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
          <FormSelect title={'sex'} text={value} onChangeOption={(o) => onChange(o.value)} options={options} error={errors.sex && 'This is required.'} />
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
      <Controller control={control} rules={{ required: true }} name='profile' render={({ field: { onChange } }) => {
        return <FormImage title='Profile picture*' onPickImage={onChange} />
      }} />
      <Controller control={control} rules={{ required: true }} name='resume' render={({ field: { onChange } }) => {
        return <FormImage title='Resume' onPickImage={onChange} />
      }} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormText title='Description' onChangeText={onChange} error={errors.description && 'This is required.'} multiline={true} />
        )}
        name='description'
      />
      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      <Spacing height={size[8]} />
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
