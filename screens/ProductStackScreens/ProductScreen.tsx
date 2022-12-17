import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { addProduct } from '../../reducers/slice/cart'
import { Button } from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { FormSelect } from '../../starter/component/Form/FormSelect'
import { FormText } from '../../starter/component/Form/FormText'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { productSeletor } from '@slice/product'
import { ProductStackScreenProps } from '../../types'
import { size } from '../../starter/themes/size'
import { Spacing } from '../../starter/component/Spacing'
import { useDispatch, useSelector } from 'react-redux'


interface IForm {
  color: string
  size: string
  quantity: string
}

export default function ProductScreen({
  navigation,
  route,
}: ProductStackScreenProps<'ProductPage'>) {
  const { products } = useSelector(productSeletor)
  const product = products.find(p => p.id == route.params.id)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      color: '',
      size: '',
      quantity: ''
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data: IForm) => {
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
  }

  let colorOptions: { value: string; title: string }[] = product?.availability.map(d => ({ value: d.product_color.data.attributes.name, title: d.product_color.data.attributes.name })) || []

  let sizeOptions: { value: string; title: string }[] = product?.availability.map(d => ({ value: d.product_size.data.attributes.name, title: d.product_size.data.attributes.name })) || []

  console.log(product?.images.data[0].attributes.url)

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode='cover' source={{ uri: `http://165.22.255.85:1337${product?.images.data[0].attributes.url}` }} />
      <ScrollView style={styles.textContainer}>
        <Text style={styles.name}>{product?.name}</Text>
        <Spacing height={size[4]} />
        
        <Text style={styles.price}>
          {'$' + product?.price}
        </Text>
        <Spacing height={size[4]} />
        <Controller
          name='color'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <FormSelect title='Color' onChangeOption={(o) => onChange(o.value)} text={value} options={colorOptions} error={errors.size && 'This is required.'} />
          )}
        />
        <Controller
          name='size'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <FormSelect title='Size' onChangeOption={(o) => onChange(o.value)} text={value} options={sizeOptions} error={errors.size && 'This is required.'} />
          )}
        />
        <Controller
          name='quantity'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <FormText title='Quantity' onChangeText={onChange} error={errors.quantity && 'This is required.'} keyboardType='number-pad'/>
          )}
        />
        <Spacing height={size[4]} />
        <Text style={styles.desc}>{product?.description}</Text>
      </ScrollView>
      <Button
        style={{ width: '85%' }}
        title='Add to Cart'
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1
  },
  textContainer: {
    flex: 1,
    padding: size[4]
  },
  image: {
    width: size.screenWidth,
    height: size.screenWidth,
    resizeMode: 'cover',
  },
  name: {
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 16,
    lineHeight: 30,
  },
  price: {
    fontSize: 25,
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
