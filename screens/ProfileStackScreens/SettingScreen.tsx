import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProfileStackScreenProps } from '../../types'
import { FontAwesome } from '@expo/vector-icons'

export default function SettingScreen({
  navigation,
}: ProfileStackScreenProps<'SettingPage'>) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <FontAwesome size={30} name='plus' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 100,
  },
})
