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
import { t } from '../../starter/helper/i18n'

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
            <Text style={styles.bold}>{t('address')}</Text>
            <Text style={styles.gray}>葵涌大連排美安工業大廈</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>{t('phone')}</Text>
            <Text style={styles.gray}>60187633</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.bold}>{t('email')}</Text>
            <Text style={styles.gray}>info@faithfitnesshk.com</Text>
          </View>

          <View style={styles.textRow}>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://www.instagram.com/faith_muaythai')}
            >
              Instagram
            </Text>
          </View>

          <View style={styles.textRow}>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('http://www.faithmuaythai.com/')}
            >
              {t('website')}
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
    textDecorationLine: 'underline'
  },
  icons: {
    width: 50,
    height: 50,
    // alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
})
