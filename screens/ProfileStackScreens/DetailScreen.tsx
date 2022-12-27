import React, { useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button } from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import {
  FormText,
  Row,
  SectionWrapper,
  size,
  Spacing
  } from '@starter'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoRegister, userInfoSeletor } from '@slice/userInfo'


interface IForm extends IUserInfoRegisterRequest {
}

export default function DetailScreen({
  navigation,
}: ProfileStackScreenProps<'DetailPage'>) {
  const { user, status } = useSelector(userInfoSeletor)
  useEffect(() => {
    if (status === 'failed') {
      Alert.alert('Register failed', 'Username or email has been used, please change it', [{ text: 'ok' }])
    } else if (status === 'success') {
      Alert.alert('Register Success', undefined, [{
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
        return <FormText title='User Name' onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='email' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='E-mail' onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='password' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='Password' isPaasword onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='phone' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='Phone Number' onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Controller control={control} name='address' rules={{ required: true }} render={({ field: { value, onChange } }) => {
        return <FormText title='Address' onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
      <Button
        style={styles.button}
        title='Edit Profile'
        onPress={handleSubmit(onPressRegister)}
      />
    </View>
  } else {
    return (
      <View style={styles.container}>
        <SectionWrapper>
          <Row title='Name' description={user.username}></Row>
          <Row title='Email' description={user.email}></Row>
          <Row title='Phone' description={user.phone}></Row>
          <Row title='Address' description={user.address}></Row>
        </SectionWrapper>
        <Spacing height={size[4]} />
        <Button
          style={styles.button}
          title='Edit Profile'
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
