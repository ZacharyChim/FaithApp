import React from 'react'
import uuid from 'react-native-uuid'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

import { CartStackScreenProps } from '../../types'

const width = Dimensions.get('window').width

//Redux
import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

export default function EmptyScreen({
  navigation,
}: CartStackScreenProps<'EmptyPage'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.empty}>
        Thank you. Your order is being processed, Please check your email for
        the confirmation letter.
      </Text>
      <Button
        title='Back to Product'
        onPress={() => {
          navigation.navigate('ProductsPage')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  empty: {
    fontSize: 16,
  },
  button: {
    width: '100%',
  },
})
