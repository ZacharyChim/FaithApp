import React from 'react'
import { ButtonLight } from '../../components/ButtonLight'
import { FontAwesome } from '@expo/vector-icons'
import { logout } from '../../redux/slice/user'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'


const width = Dimensions.get('window').width

export default function SettingScreen({
  navigation,
}: ProfileStackScreenProps<'SettingPage'>) {
  const users = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  let isLogin = false
  let currentUser
  if (users.length > 0) {
    currentUser = users.find((user) => user.isLogin)
    if (currentUser) {
      isLogin = true
    }
  }
  const userLogout = () => {
    dispatch(logout(currentUser.userId))
  }
  if (isLogin) {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.circle}>
            <FontAwesome size={30} name='plus' />
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>

          <View style={styles.box}>
            <Text>Available lesson(s)</Text>
            <Text style={styles.gray}>5</Text>
          </View>

          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('DetailPage')}
          >
            <Text>Profile</Text>
            <Text style={styles.gray}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('ContactPage')}
          >
            <Text>Contact Us</Text>
            <Text style={styles.gray}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
          <ButtonLight
            style={styles.button}
            title='Log Out'
            onPress={userLogout}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}>Your are not logged in</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: width,
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  name: {
    margin: 20,
    fontSize: 30,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  box2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 25,
  },
  gray: {
    color: '#757575',
  },
  button: {
    width: '100%',
  },
  top: {
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  empty: {
    fontSize: 20,
  },
})
