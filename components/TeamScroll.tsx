import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { HomeStackScreenProps } from '../types'
import { View } from './Themed'
import TrainerCard from './TrainerCard'
import { trainers } from '../data/Trainers'

export default function TeamScroll({
  navigation,
}: HomeStackScreenProps<'HomePage'>) {
  return (
    <View style={styles.TeamList}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {trainers.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('TrainerPage', { ...item })}
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
                imageUri={item.imageUri}
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
