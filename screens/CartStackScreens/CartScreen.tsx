import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '../../components/Themed'
import { RootTabScreenProps } from '../../types'

export default function CartScreen({ navigation }: RootTabScreenProps<'Cart'>) {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.step}>
          <View style={styles.active}>
            <Text style={styles.circleText}>1</Text>
          </View>
          <View>
            <Text style={styles.topText}>Shopping</Text>
            <Text style={styles.topText}>Cart</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>2</Text>
          </View>
          <View>
            <Text style={styles.topText}>Fill</Text>
            <Text style={styles.topText}>Information</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>3</Text>
          </View>
          <View>
            <Text style={styles.topText}>Order</Text>
            <Text style={styles.topText}>Confirmation</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text>Cart</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#ccc',
  },
  step: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    // flex: 1,
    margin: 10,
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#757575',
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
  },
  topText: {
    textAlign: 'center',
  },
  mainContainer: {
    flex: 7,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
