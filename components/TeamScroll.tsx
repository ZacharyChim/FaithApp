import { FC } from 'react'
import { ITrainer } from '../reducers/slice/trainerType'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
  } from 'react-native'
import { TrainerCard } from './TrainerCard'


interface ITeamScroll {
  onSelected: (id: number) => void
  trainers: ITrainer[]
}

export const TeamScroll: FC<ITeamScroll> = ({onSelected, trainers}) => {
  return (
    <View style={styles.TeamList}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {trainers.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelected(item.id)}
            >
              <TrainerCard
                style={{
                  marginLeft: 20,
                  height: 130,
                  width: 100,
                  borderWidth: 0.5,
                  borderColor: '#ddd',
                }}
                imageStyle={{ height: 90, width: 80 }}
                imageUri={`https://admin.faithfitnesshk.com${item.image.data.attributes.url}`}
                name={item.name}
              ></TrainerCard>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  TeamList: {
    height: 140,
  },
})
