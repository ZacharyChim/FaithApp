import React from 'react'
import { Text } from 'react-native'
import { ProfileStackScreenProps } from '../../types'

export default function ContactScreen({
  navigation,
}: ProfileStackScreenProps<'ContactPage'>) {
  return <Text>Contact</Text>
}
