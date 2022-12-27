import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoLogin, userInfoSeletor } from '@slice/userInfo'
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
  const {user} = useSelector(userInfoSeletor)
  const dispatch = useDispatch<any>()
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  useEffect(() => {
    if (user) {
      dispatch(userInfoActions.resetStatus())
      navigation.goBack()
    }
  }, [user])

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
