import EditScreenInfo from '../components/EditScreenInfo'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormText } from '../starter/component/Form/FormText'
import { RootTabScreenProps } from '../types'
import { StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { userInfoSeletor } from '@slice/userInfo'
import { useSelector } from 'react-redux'


export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<'Profile'>) {
  const { user } = useSelector(userInfoSeletor)
  const { control, handleSubmit, formState: { errors } } = useForm<IUserInfoRegisterRequest & { repeatPassword: string }>({
    defaultValues: {
      username: '',
      repeatPassword: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    }
  })

  if (!user) {
    return <View>
      <Controller control={control} name='username' render={({ field: { value, onChange } }) => {
        return <FormText onChangeText={onChange} text={value} error={errors.username && 'This is required'} />
      }} />
    </View>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <EditScreenInfo path='/screens/TabOneScreen.tsx' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
