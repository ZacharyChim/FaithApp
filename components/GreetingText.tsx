import React from 'react'
import { StyleSheet, Text } from 'react-native'


const GreetingText: React.FC = ({ }) => {
  return <Text style={styles.title}>Welcome back!</Text>
}

export default GreetingText

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
})
