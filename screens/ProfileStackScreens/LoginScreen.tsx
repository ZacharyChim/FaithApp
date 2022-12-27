import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch } from 'react-redux'
import { userInfoLogin } from '@slice/userInfo'
import {
  Button,
  FormText,
  size,
} from '@starter'
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'


const width = Dimensions.get('window').width

interface IForm {
  identifier: string
  password: string
}

export default function LoginScreen({
  navigation,
}: ProfileStackScreenProps<'LoginPage'>) {
  const dispatch = useDispatch<any>()
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  const onPressLogin = (data: IForm) => {
    dispatch(userInfoLogin(data))
  }

  return (
    <View style={styles.container}>
      <Controller control={control} name='identifier' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='User Name' onChangeText={onChange} text={value} error={errors.identifier && 'This is required'} />
      }} />
      <Controller control={control} name='password' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='Password' isPaasword onChangeText={onChange} text={value} error={errors.password && 'This is required'} />
      }} />
      <Button
        title='Login'
        onPress={handleSubmit(onPressLogin)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[4]
  },
})
