import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { ProductStackScreenProps } from '../../types'
import { useForm, Controller } from 'react-hook-form'
import RNPickerSelect from 'react-native-picker-select'
import { Button } from '../../components/Button'

// redux
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/features/cart'

export default function ProductScreen({
  navigation,
  route,
}: ProductStackScreenProps<'ProductPage'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      color: '',
      size: '',
      quantity: '',
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const product = {
      categoryId: route.params.item.categoryId,
      id: route.params.item.id,
      name: route.params.item.name,
      imageUri: route.params.item.imageUri,
      price: route.params.item.price,
      discountPrice: route.params.item.discountPrice,
      description: route.params.item.description,
      color: data.color,
      size: data.size,
      quantity: data.quantity,
    }
    dispatch(addProduct(product))
    reset()
    navigation.navigate('CartPage')
  }

  let colorOptions: { value: string; label: string }[] = []
  for (let i = 0; i < route.params.item.color.length; i++) {
    colorOptions.push({
      value: route.params.item.color[i],
      label: route.params.item.color[i],
    })
  }

  let sizeOptions: { value: string; label: string }[] = []
  for (let i = 0; i < route.params.item.size.length; i++) {
    sizeOptions.push({
      value: route.params.item.size[i],
      label: route.params.item.size[i],
    })
  }

  let quantityOptions: { value: number; label: string }[] = []
  for (let i = 1; i < route.params.item.stock + 1; i++) {
    quantityOptions.push({
      value: i,
      label: i.toString(),
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={route.params.item.imageUri} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{route.params.item.name}</Text>
        <Text style={styles.desc}>{route.params.item.description}</Text>
        <Text style={styles.price}>
          {'$' + route.params.item.discountPrice + '.00'}
        </Text>
        <View style={styles.twoColumn}>
          <View style={styles.item}>
            <Text>Color</Text>
            <Controller
              name='color'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value, ref } }) => (
                <RNPickerSelect
                  placeholder={{
                    label: 'Select Color',
                  }}
                  items={colorOptions}
                  value={value}
                  onValueChange={onChange}
                  style={pickerSelectStyles}
                />
              )}
            />
            {errors.color && <Text>This is required.</Text>}
          </View>
          <View style={styles.item}>
            <Text>Size</Text>
            <Controller
              name='size'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value, ref } }) => (
                <RNPickerSelect
                  placeholder={{
                    label: 'Select Size',
                  }}
                  items={sizeOptions}
                  value={value}
                  onValueChange={onChange}
                  style={pickerSelectStyles}
                />
              )}
            />
            {errors.size && <Text>This is required.</Text>}
          </View>
        </View>
        <View style={styles.oneColumn}>
          <Text>Quantity</Text>
          <Controller
            name='quantity'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, ref } }) => (
              <RNPickerSelect
                placeholder={{
                  label: 'Select Quantity',
                }}
                items={quantityOptions}
                value={value}
                onValueChange={onChange}
                style={pickerSelectStyles}
              />
            )}
          />
          {errors.quantity && <Text>This is required.</Text>}
        </View>
      </View>
      <Button
        style={{ width: '95%' }}
        title='Add to Cart'
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    marginBottom: 20,
  },
  textContainer: {
    flex: 3,
  },
  image: {
    // flex: 1,
    // width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // marginVertical: 20,
  },
  name: {
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 16,
    lineHeight: 30,
    marginHorizontal: 20,
  },
  price: {
    fontSize: 25,
    marginHorizontal: 20,
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  twoColumn: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    padding: 10,
  },
  item: {
    width: '50%',
    paddingRight: 10,
  },
  oneColumn: {
    flex: 1,
    marginHorizontal: 30,
    // width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // fontSize: 16,
    width: '100%',
    marginVertical: 10,
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
