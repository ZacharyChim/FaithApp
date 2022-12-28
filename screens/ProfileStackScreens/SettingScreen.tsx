import React from 'react'
import {
  Button,
  colors,
  Icons,
  Row,
  size,
  Spacing
  } from '@starter'
import { courseActions } from '@slice/course'
import { FontAwesome } from '@expo/vector-icons'
import { ProfileStackScreenProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoActions, userInfoSeletor } from '@slice/userInfo'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


export default function SettingScreen({
  navigation,
}: ProfileStackScreenProps<'SettingPage'>) {
  const dispatch = useDispatch()
  const { user } = useSelector(userInfoSeletor)

  const userLogout = () => {
    dispatch(userInfoActions.logout())
    dispatch(courseActions.resetCourse())
  }

  const onPressProfile = () => {
    navigation.navigate('DetailPage')
  }

  const onPressContactUs = () => {
    navigation.navigate('ContactPage')
  }

  const onPressLogin = () => {
    navigation.navigate('LoginPage')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.top}>
          {user && <>
            <FontAwesome name="user-circle-o" size={150} color="black" />
            <Text style={styles.name}>{user?.username}</Text>
          </>}
        </View>
        <Row title='Available lesson(s)' description='5' />
        {user && <Row title='Profile' rightIcon={Icons({ name: 'right', color: colors.gray600 })} onPress={onPressProfile} />}
        <Row title='Contact Us' rightIcon={Icons({ name: 'right', color: colors.gray600 })} onPress={onPressContactUs} />
        <Spacing height={size[6]} />
        {user
          ?
          <Button
            title='Log Out'
            color={colors.danger}
            onPress={userLogout}
          />
          : <>
            <Button title='login' onPress={onPressLogin} type='outline' />
            <Spacing height={size[4]} />
            <Button title='register' onPress={onPressProfile} type='outline' />
          </>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: size[4],
  },
  name: {
    margin: 20,
    fontSize: 30,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
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
    width: '100%',
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
    alignItems: 'center'
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  empty: {
    fontSize: 20,
  },
})
