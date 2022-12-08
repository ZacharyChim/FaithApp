import { colors } from '../../themes/colors'
import {
  FC,
  ReactNode,
  useEffect,
  useState
  } from 'react'
import { Icons } from '../../themes/icons'
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  View
  } from 'react-native'
import { size } from '../../themes/size'
import { Text } from '../Text'


interface IModalWrapperProps {
  isVisible: boolean
  title: string
  hideModel: () => void
  children: ReactNode
}

export const ModalWrapper: FC<IModalWrapperProps> = ({ title, isVisible, hideModel, children }) => {
  const [isShowingKeyboard, setIsShowingKeyboard] = useState<boolean>(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setIsShowingKeyboard(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setIsShowingKeyboard(false)
    })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [isVisible])

  const onPressClose = () => {
    hideModel?.()
  }

  const onPressBackground = () => {
    if (isShowingKeyboard) {
      Keyboard.dismiss()
    } else {
      hideModel?.()
    }
  }

  return (
    <Modal animationType='fade' transparent={true} visible={isVisible}>
      <View style={styles.background}></View>
      <Pressable style={{ flex: 1 }} onPress={onPressBackground}>
        <View style={styles.container}>
          <Pressable>
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <Text.H2 style={styles.title}>{title}</Text.H2>
                {Icons({ name: 'close', color: colors.dark, onPress: onPressClose, size: size[6] })}
              </View>
              {children}
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    opacity: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray600,
    padding: size[2],
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderColor: colors.gray600,
    borderWidth: 1,
    borderRadius: size[2],
  },
})
