import React from 'react'
import { Button } from '../../components/Button'
import { ButtonCancel } from '../../components/ButtonCancel'
import { ButtonLight } from '../../components/ButtonLight'
import { Controller, useForm } from 'react-hook-form'
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View
    } from 'react-native'
import { ProfileStackScreenProps } from '../../types'
import { updateUser } from '../../redux/slice/user'
import { useDispatch, useSelector } from 'react-redux'


const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



const width = Dimensions.get('window').width

export default function EditScreen({
  navigation,
}: ProfileStackScreenProps<'EditPage'>) {
  const users = useSelector((state) => state.user.value)
  let currentUser = users.find((user) => user.isLogin)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      phone: currentUser.phone,
      email: currentUser.email,
      password: '',
      password2: '',
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (data.password !== data.password2) {
      return alert('Passwords do not match')
    } else {
      const user = {
        userId: currentUser.userId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        isLogin: true,
      }
      dispatch(updateUser(user))
      reset()
      console.log(data)
      console.log(user)
      // console.log(users)
      navigation.navigate('DetailPage')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>Name*</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.box}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue={currentUser.name}
            />
          )}
          name='name'
        />
        {errors.name && <Text>This is required.</Text>}

        <Text style={styles.label}>Phone*</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.box}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue={currentUser.phone}
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.box}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue={currentUser.email}
            />
          )}
          name='email'
        />
        {errors.email && <Text>This is required.</Text>}

        <Text style={styles.label}>Password*</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.box}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue=''
            />
          )}
          name='password'
        />
        {errors.password && <Text>This is required.</Text>}

        <Text style={styles.label}>Password, again*</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.box}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue=''
            />
          )}
          name='password2'
        />
        {errors.password2 && <Text>This is required.</Text>}
      </View>

      <View style={styles.bottom}>
        <Button
          style={styles.button}
          title='Save'
          onPress={handleSubmit(onSubmit)}
        />

        <ButtonCancel
          style={styles.button}
          title='Cancel'
          onPress={() => navigation.navigate('DetailPage')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: width,
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
  top: {
    width: '100%',
    // alignItems: 'stretch',
    // marginTop: 100,
    marginHorizontal: 20,
  },
  bottom: {
    width: '100%',
    marginTop: 10,
    // alignItems: 'stretch',
  },
  button: {
    width: '90%',
    // marginHorizontal: 20,
    marginLeft: 20,
  },
})
