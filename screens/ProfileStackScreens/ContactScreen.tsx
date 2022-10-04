import React from 'react'
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ProfileStackScreenProps } from '../../types'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default function ContactScreen({
  navigation,
}: ProfileStackScreenProps<'ContactPage'>) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.image}
          source={require('../../assets/images/contact.png')}
        />
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.bold}>Address</Text>
            <Text style={styles.gray}>葵涌大連排美安工業大廈</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>Phone</Text>
            <Text style={styles.gray}>5555 5555</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>Email</Text>
            <Text style={styles.gray}>Faith@gmail.com</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>Instagram</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('http://www.faith.com')}
            >
              http://www.faith.com
            </Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>Website</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('http://www.faith.com')}
            >
              http://www.faith.com
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image
          style={styles.icons}
          source={require('../../assets/images/instagram.png')}
        ></Image>
        <Image
          style={styles.icons}
          source={require('../../assets/images/signal.png')}
        ></Image>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: height,
    width: width,
  },
  top: {
    width: '100%',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    alignItems: 'flex-end',
  },
  image: {
    height: 188,
    width: '100%',
  },
  textContainer: {
    marginTop: 20,
  },
  textRow: {
    flexDirection: 'row',
    margin: 5,
  },
  bold: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  gray: {
    fontSize: 16,
    color: '#757575',
  },
  link: {
    fontSize: 16,
    color: '#0D47A1',
  },
  icons: {
    width: 50,
    height: 50,
    // alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
})
