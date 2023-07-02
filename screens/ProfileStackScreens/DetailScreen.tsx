import React, { useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button } from '../../components/Button'
import {
  colors,
  FormText,
  Row,
  SectionWrapper,
  size,
  Spacing,
  t
  } from '@starter'
import { Controller, useForm } from 'react-hook-form'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoRegister, userInfoSeletor } from '@slice/userInfo'


const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
interface IForm extends IUserInfoRegisterRequest {
}

export default function DetailScreen({
  navigation,
}: ProfileStackScreenProps<'DetailPage'>) {
  const { user, status } = useSelector(userInfoSeletor)
  useEffect(() => {
    if (status === 'failed') {
      Alert.alert(t('registerFailed'), t('registerFailedDescription'), [{ text: 'ok' }])
    } else if (status === 'success') {
      Alert.alert(t('registersSuccess'), undefined, [{
        text: 'ok', onPress: () => {
          dispatch(userInfoActions.resetStatus())
          navigation.goBack()
        }
      }])
    }
  }, [status])


  const dispatch = useDispatch<any>()
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    }
  })

  const onPressRegister = (data: IForm) => {
    dispatch(userInfoRegister(data))
  }

  const onPressEdit = () => {
    navigation.navigate('EditPage')
  }

  if (!user) {
    return <View style={styles.container}>
      <Controller control={control} name='username' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('userName')} onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='email' rules={{
        required: true, pattern: {
          value: EMAIL_REGEX,
          message: 'Not a valid email',
        },
      }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('email*')} onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='password' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('password*')} isPaasword onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='phone' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('phone*')} onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='address' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title={t('address*')} onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Button
        style={styles.button}
        title={t('submit')}
        onPress={handleSubmit(onPressRegister)}
      />
    </View>
  } else {
    return (
      <View style={styles.container}>
        <SectionWrapper>
          <Row title={t('userName')} description={user.username}></Row>
          <Row title={t('email*')} description={user.email}></Row>
          <Row title={t('phone*')} description={user.phone}></Row>
          <Row title={t('address*')} description={user.address}></Row>
        </SectionWrapper>
        <Spacing height={size[4]} />
        <Button
          style={styles.button}
          title={t('editProfile')}
          onPress={onPressEdit}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[4]
  },
  button: {
    width: '100%',
  },
})
