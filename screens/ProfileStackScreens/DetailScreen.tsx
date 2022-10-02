import React from 'react'
import { Text } from 'react-native'
import { ProfileStackScreenProps } from '../../types'

export default function DetailScreen({
  navigation,
}: ProfileStackScreenProps<'DetailPage'>) {
  return <Text>Detail</Text>
}
