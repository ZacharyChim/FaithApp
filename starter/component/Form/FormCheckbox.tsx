import { colors } from '../../themes/colors'
import { Octicons } from '@expo/vector-icons'
import { size } from '../../themes/size'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from '../Text'
import { useState } from 'react'


interface IProps {
  initialValue?: boolean
  set: (props: { isCheck: boolean }) => void
  title: string
}

export const FormCheckbox = ({ title, set, initialValue = false }: IProps) => {
  const [isCheck, setIsCheck] = useState(initialValue)

  const boxContainerStyle: StyleProp<ViewStyle> = isCheck
    ? { borderColor: colors.primaryDark }
    : { borderColor: colors.gray600 }

  const onPressCheck = () => {
    setIsCheck(!isCheck)
    set({ isCheck: !isCheck })
  }

  return (
    <TouchableWithoutFeedback onPress={onPressCheck}>
      <View style={styles.container}>
        <View style={[styles.checkBoxContainer, boxContainerStyle]}>
          {isCheck && <Octicons name='check' size={size[5]} color={colors.primaryDark} />}
        </View>
        <Text>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    marginRight: size[3],
    width: size[6],
    height: size[6],
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: size[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
})
