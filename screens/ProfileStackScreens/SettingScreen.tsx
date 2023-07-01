import React from 'react'
import {
  Button,
  colors,
  Icons,
  Row,
  size,
  Spacing,
  t
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
import { useActionSheet } from '@expo/react-native-action-sheet'
import { settingActions, settingSeletor } from '@slice/setting'
import * as Updates from 'expo-updates'


export default function SettingScreen({
  navigation,
}: ProfileStackScreenProps<'SettingPage'>) {
  const { showActionSheetWithOptions } = useActionSheet()
  const dispatch = useDispatch()
  const { user } = useSelector(userInfoSeletor)

  const { language }  = useSelector(settingSeletor)

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

  const onPressChangeLanguage = () => {
    const options = ['English', '中(繁)', '中(簡)', t('cancel')]
    const cancelButtonIndex = 3

    showActionSheetWithOptions({options}, (selectedIndex) => {
      switch (selectedIndex) {
        case 0:
          dispatch(settingActions.changeLanguage('en'))
          break
        case 1:
          dispatch(settingActions.changeLanguage('zh'))
          break
        case 2:
          dispatch(settingActions.changeLanguage('zh_CN'))
          break
        case cancelButtonIndex:
        // Canceled
      }
      setTimeout(() => {
        Updates.reloadAsync()
      }, 300);
    })
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
        {user && <Row title={t('profile')} rightIcon={Icons({ name: 'right', color: colors.gray600 })} onPress={onPressProfile} />}
        <Row title={t('contactUs')} rightIcon={Icons({ name: 'right', color: colors.gray600 })} onPress={onPressContactUs} />
        <Row title={t('changelanguage')} rightIcon={Icons({ name: 'right', color: colors.gray600 })} onPress={onPressChangeLanguage} />
        <Spacing height={size[6]} />
        {user
          ?
          <Button
            title={t('logOut')}
            color={colors.danger}
            onPress={userLogout}
          />
          : <>
            <Button title={t('login')} onPress={onPressLogin} type='outline' />
            <Spacing height={size[4]} />
            <Button title={t('register')} onPress={onPressProfile} type='outline' />
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
