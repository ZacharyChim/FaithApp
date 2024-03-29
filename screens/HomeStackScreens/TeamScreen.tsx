import React from 'react'
import { Button } from '../../components/Button'
import { HomeStackScreenProps } from '../../types'
import { TrainerCard } from '../../components/TrainerCard'
import { trainerSeletor } from '../../reducers/slice/trainer'
import { useSelector } from 'react-redux'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { t } from '../../starter/helper/i18n'


export default function TeamScreen({
  navigation,
}: HomeStackScreenProps<'TeamPage'>) {
  const {trainers} = useSelector(trainerSeletor)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={trainers}
        keyExtractor={(item) => `trainer_${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('TrainerPage', { id: item.id })}
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
              imageUri={`https://admin.faithfitnesshk.com${item.image.data.attributes.url}`}
              name={item.name}
            />
          </TouchableOpacity>
        )}
      ></FlatList>
      <Button
        style={{ width: '90%' }}
        title={t('becomeOurTrainer')}
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
