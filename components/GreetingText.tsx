import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { t } from '../starter/helper/i18n'


const GreetingText: React.FC = ({ }) => {
  return <Text style={styles.title}>{t('welcome')}</Text>
}

export default GreetingText

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
})
