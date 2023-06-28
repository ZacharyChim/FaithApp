import React from 'react'
import { addProduct } from '../../reducers/slice/cart'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { Button } from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { FormSelect } from '../../starter/component/Form/FormSelect'
import { FormText } from '../../starter/component/Form/FormText'
import { productSeletor } from '@slice/product'
import { ProductStackScreenProps } from '../../types'
import { size } from '../../starter/themes/size'
import { Spacing } from '../../starter/component/Spacing'
import { useDispatch, useSelector } from 'react-redux'
import { t } from '../../starter/helper/i18n'
import { uniq } from 'ramda'


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
      quantity: '1'
    },
  })

  const dispatch = useDispatch()

  const onSubmit = (data: IForm) => {
    if (!product) {
      return
    }
    dispatch(addProduct({ ...data, product: product }))
    Alert.alert(t('itemAdded'), undefined, [{
      text: 'ok', onPress: () => {
        navigation.popToTop()
      }
    }])
  }

  let colorOptions: { value: string; title: string }[] = uniq(product?.availability.map(d => ({ value: d.product_color.data.attributes.name, title: d.product_color.data.attributes.name })) || [])

  let sizeOptions: { value: string; title: string }[] = uniq(product?.availability.map(d => ({ value: d.product_size.data.attributes.name, title: d.product_size.data.attributes.name })) || [])

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
            <FormSelect title={t('color')} onChangeOption={(o) => onChange(o.value)} text={value} options={colorOptions} error={errors.size && 'This is required.'} />
          )}
        />
        <Controller
          name='size'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <FormSelect title={t('size')} onChangeOption={(o) => onChange(o.value)} text={value} options={sizeOptions} error={errors.size && 'This is required.'} />
          )}
        />
        <Controller
          name='quantity'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <FormText title={t('quantity')} onChangeText={onChange} error={errors.quantity && 'This is required.'} keyboardType='number-pad' />
          )}
        />
        <Spacing height={size[4]} />
        <Text style={styles.desc}>{product?.description}</Text>
        <Spacing height={size[12]}/>
      </ScrollView>
      <Button
        style={{ width: '85%' }}
        title={t('addToCart')}
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
