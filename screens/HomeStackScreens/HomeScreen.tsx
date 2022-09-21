import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import GreetingText from '../../components/GreetingText'
import { HomeStackScreenProps } from '../../types'

import Slider from '../../components/Slider'
import { images } from '../../data/SliderImages'
import TeamScroll from '../../components/TeamScroll'

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'HomePage'>) {
  let testUser = 'Jane'

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/faith.png')}
      ></Image>
      <GreetingText user={testUser} />
      <Slider images={images} />
      {/* <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      /> */}
      <View style={styles.TextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TeamPage')}>
          <Text style={styles.TextOurTeam}>Our Team</Text>
        </TouchableOpacity>
      </View>
      <TeamScroll navigation={navigation} />
      {/* <View>
        <TouchableOpacity onPress={() => navigation.navigate('TeamPage')}>
          <Text>Team</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TrainerPage')}>
          <Text>Trainer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('JoinUsPage')}>
          <Text>Join Us</Text>
        </TouchableOpacity>
      </View> */}
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
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
})
