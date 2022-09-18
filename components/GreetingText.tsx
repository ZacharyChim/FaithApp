import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
  user: string
}

const GreetingText: React.FC<Props> = ({ user }) => {
  return <Text style={styles.title}>Good Morning, {user}!</Text>
}

export default GreetingText

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
})
