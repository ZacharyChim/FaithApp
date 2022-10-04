import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProfileStackScreenProps } from '../../types'

import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

export default function DetailScreen({
  navigation,
}: ProfileStackScreenProps<'DetailPage'>) {
  const users = useSelector((state) => state.user.value)
  let currentUser = users.find((user) => user.isLogin)
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>Name*</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{currentUser.name}</Text>
        </View>

        <Text style={styles.label}>Phone*</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{currentUser.phone}</Text>
        </View>

        <Text style={styles.label}>Email*</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{currentUser.email}</Text>
        </View>

        <Text style={styles.label}>Password*</Text>
        <View style={styles.box}>
          <Text style={styles.text}>********</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Button
          style={styles.button}
          title='Edit Profile'
          onPress={() => navigation.navigate('EditPage')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    marginTop: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#BDBDBD',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  top: {
    width: '100%',
    alignItems: 'stretch',
    // marginTop: 100,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
})
