import React from 'react'
import { HomeStackScreenProps } from '../../types'
import {
  Image,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { trainerSeletor } from '../../reducers/slice/trainer'
import { useSelector } from 'react-redux'


export default function TrainerScreen({
  route,
  navigation,
}: HomeStackScreenProps<'TrainerPage'>) {
  const { trainers } = useSelector(trainerSeletor)
  const { id } = route.params
  const trainer = trainers.find(d => d.id == id)
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `https://admin.faithfitnesshk.com${trainer?.image.data.attributes.url}` }} style={styles.image} />
        <Text style={styles.title}>{trainer?.name}</Text>
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.desc}>{trainer?.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
