import GreetingText from '../../components/GreetingText'
import React, { useEffect } from 'react'
import Slider from '../../components/Slider'
import { getTrainer, trainerSeletor } from '../../reducers/slice/trainer'
import { HomeStackScreenProps } from '../../types'
import { images } from '../../data/SliderImages'
import { TeamScroll } from '../../components/TeamScroll'
import { useDispatch, useSelector } from 'react-redux'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'HomePage'>) {
  const {trainers} = useSelector(trainerSeletor)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(getTrainer())
  }, [])

  const navigationToTrainerDetail = (id: number) => {
    navigation.navigate('TrainerPage', {id})
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/faith.png')}
      ></Image>
      <GreetingText />
      <Slider images={images} />
      <View style={styles.TextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TeamPage')}>
          <Text style={styles.TextOurTeam}>Our Team</Text>
        </TouchableOpacity>
      </View>
      <TeamScroll trainers={trainers} onSelected={navigationToTrainerDetail} />
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
  image: {
    width: 150,
    height: 150,
  },
  banner: {
    width: 350,
    height: 180,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  TextContainer: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  TextOurTeam: {
    marginTop: 40,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
})
