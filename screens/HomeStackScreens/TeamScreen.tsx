import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import TrainerCard from '../../components/TrainerCard'

import { trainers } from '../../data/Trainers'
import { HomeStackScreenProps } from '../../types'

import { Button } from '../../components/Button'

export default function TeamScreen({
  navigation,
}: HomeStackScreenProps<'TeamPage'>) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('TrainerPage', { ...item })}
          >
            <TrainerCard
              style={{
                margin: 20,
                height: 170,
                width: 140,
                borderWidth: 0.5,
                borderColor: '#ddd',
              }}
              imageStyle={{ height: 130, width: 110 }}
              imageUri={item.imageUri}
              name={item.name}
            />
          </TouchableOpacity>
        )}
      ></FlatList>
      <Button
        title='Become Our Trainer'
        onPress={() => navigation.navigate('JoinUsPage')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})
