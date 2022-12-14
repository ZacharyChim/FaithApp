import React, { useEffect } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  View
  } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoSeletor, userInfoUpdate } from '@slice/userInfo'
import {
  Button,
  FormText,
  LoadingLottie,
  Spacing,
  colors,
  size,
} from '@starter'


const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface IForm extends IUserInfoRegisterRequest {
  password2: string
}


export default function EditScreen({
  navigation,
}: ProfileStackScreenProps<'EditPage'>) {
  const {user, updateInfoStatus} = useSelector(userInfoSeletor)

  if (!user) {
    return null
  }

  useEffect(() => {
    if (updateInfoStatus === 'success') {
      dispatch(userInfoActions.resetStatus())
      Alert.alert('Update success', undefined, [{text: 'ok', onPress: () => {
        navigation.goBack()
      }}])
    }
  }, [updateInfoStatus])

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      username: user.username,
      phone: user.phone,
      email: user.email,
      address: user.address,
      password: '',
      password2: '',
    },
  })

  const dispatch = useDispatch<any>()

  const onSubmit = (data: IForm) => {
    dispatch(userInfoUpdate(data))
  }

  const onPressDelete = () => {
    Alert.alert('Confirm', 'We will delete you account after reviewing your order and booking. Are you sure to delete the account?', [{text: 'Yest', onPress: () => {
      dispatch(userInfoActions.logout())
    }}])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1}}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormText title='Name*' text={value} onChangeText={onChange} error={errors.username ? 'This is required.' : undefined}/>
          )}
          name='username'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormText title='Phone*' text={value} onChangeText={onChange} error={errors.phone ? 'This is required.' : undefined}/>
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
            <FormText title='Email*' text={value} onChangeText={onChange} error={errors.email ? 'This is required.' : undefined}/>
          )}
          name='email'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormText title='Address*' text={value} onChangeText={onChange} error={errors.address ? 'This is required.' : undefined}/>
          )}
          name='address'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormText isPaasword title='Password*' text={value} onChangeText={onChange} error={errors.password ? 'This is required.' : undefined}/>
          )}
          name='password'
        />
        <Controller
          control={control}
          rules={{
            validate: (value) => {
              const values = getValues()
              console.log(values)
              return values.password === value
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormText isPaasword title='Password, again*' text={value} onChangeText={onChange} error={errors.password2 ? 'This needs to be equal password.' : undefined}/>
          )}
          name='password2'
        />
        <Spacing height={size[4]}/>
        <Button
          title='Save'
          onPress={handleSubmit(onSubmit)}
        />
        <Spacing height={size[4]}/>
        <Button
          title='Cancel'
          color={colors.primaryDark}
          onPress={() => navigation.goBack()}
          type='neat'
        />
        <Spacing height={size[8]}/>
        <Button
          title='Delete Account'
          color={colors.danger}
          onPress={onPressDelete}
          type='outline'
        />
        <LoadingLottie isVisible={updateInfoStatus === 'success'} isIndicator/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[4],
    backgroundColor: colors.white
  },
  label: {
    fontSize: 20,
    marginTop: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  bottom: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: '90%',
    marginLeft: 20,
  },
})
