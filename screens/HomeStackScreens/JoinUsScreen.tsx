import React from 'react'
import {
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '../../components/Button'
import RNPickerSelect from 'react-native-picker-select'

import * as DocumentPicker from 'expo-document-picker'

const options = [
  { value: 'male', label: 'M' },
  { value: 'female', label: 'F' },
]

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// type Inputs = {
//   email: string
//   password: string`
// }

export default function JoinUsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      sex: 'M',
      phone: '',
      email: '',
    },
  })
  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
    // alert(result.uri);
    console.log(result)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join us</Text>
      <Text style={styles.title}>Become our trainer</Text>
      <View style={styles.twoColumn}>
        <View style={styles.item}>
          <Text style={styles.label}>First name*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder=''
              />
            )}
            name='firstName'
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Last name*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='lastName'
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Age*</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='age'
          />
          {errors.age && <Text>This is required.</Text>}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Sex*</Text>
          <Controller
            name='sex'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, ref } }) => (
              <RNPickerSelect
                placeholder={{
                  label: 'Select your sex',
                }}
                items={options}
                value={value}
                onValueChange={onChange}
                style={pickerSelectStyles}
              />
            )}
          />
          {errors.sex && <Text>This is required.</Text>}
        </View>

        <Text style={styles.label}>Phone*</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input2}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder=''
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
            pattern: {
              value: EMAIL_REGEX,
              message: 'Not a valid email',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input2}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder=''
            />
          )}
          name='email'
        />
        {errors.email && <Text>Email is invalid.</Text>}

        <Text style={styles.label}>Resume*</Text>
        <Button title='Select Document' onPress={pickDocument} />
      </View>

      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  twoColumn: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 20,
    padding: 10,
  },
  item: {
    width: '50%',
  },
  label: {
    marginLeft: 10,
  },
  input: {
    borderColor: 'gray',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input2: {
    borderColor: 'gray',
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // fontSize: 16,
    width: '80%',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 10,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
})
