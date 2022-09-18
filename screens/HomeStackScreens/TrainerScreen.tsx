import React from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'

import { trainers } from '../../data/Trainers'
import { HomeStackScreenProps } from '../../types'

export default function TrainerScreen({
  route,
  navigation,
}: HomeStackScreenProps<'TrainerPage'>) {
  const { id, imageUri, name, description } = route.params
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageUri} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    marginVertical: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35,
    textAlign: 'center',
  },
  TextContainer: {
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
  },
})
