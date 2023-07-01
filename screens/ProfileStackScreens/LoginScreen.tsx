import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoLogin, userInfoSeletor } from '@slice/userInfo'
import {
  Button,
  FormText,
  LoadingLottie,
  size,
  t,
} from '@starter'
import {
  Alert,
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
  const {user, status} = useSelector(userInfoSeletor)
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

  useEffect(() => {
    if (status === 'failed') {
      Alert.alert(t('loginFailed'), t('loginFailedDescription'), [{text: 'ok', onPress: () => {
        dispatch(userInfoActions.resetStatus())
      }}])
    } else if (status === 'success') {
      dispatch(userInfoActions.resetStatus())
    }
  }, [status])

  const onPressLogin = (data: IForm) => {
    dispatch(userInfoLogin(data))
  }

  return (
    <View style={styles.container}>
      <Controller control={control} name='identifier' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('userName')} onChangeText={onChange} text={value} error={errors.identifier && t('thisIsRequired')} />
      }} />
      <Controller control={control} name='password' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('password*')} isPaasword onChangeText={onChange} text={value} error={errors.password && t('thisIsRequired')} />
      }} />
      <Button
        title='Login'
        onPress={handleSubmit(onPressLogin)}
      />
      <LoadingLottie isVisible={status === 'loading'} isIndicator/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[4]
  },
})
