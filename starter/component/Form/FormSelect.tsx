import { colors } from '../../themes/colors'
import { Entypo } from '@expo/vector-icons'
import { size } from '../../themes/size'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from '../Text'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useState } from 'react'


interface IOptions {
  title: string
  value: number | string
}

interface IProps {
  options: IOptions[]
  placeHolder?: string
  containerStyle?: StyleProp<ViewStyle>
  onChangeOption: (option: IOptions) => void
  error?: string
  text?: string
  title: string
  editable?: boolean
}

export const FormSelect = ({
  options,
  placeHolder,
  containerStyle,
  onChangeOption,
  error,
  text,
  title,
  editable = true,
}: IProps) => {
  const { showActionSheetWithOptions } = useActionSheet()
  const [isSelecting, setIsSelecting] = useState(false)

  const showActionSheet = () => {
    if (!editable) {
      return
    }
    setIsSelecting(true)
    const actionSheetOptions = options.map((option) => option.title)
    const cancelButtonIndex = options.length
    showActionSheetWithOptions({ options: actionSheetOptions, cancelButtonIndex }, (index) => {
      setIsSelecting(false)
      if (index === undefined || index === options.length) {
        return
      } else {
        const option = options[index]
        onChangeOption(option)
      }
    })
  }

  const textColor = !!text ? colors.dark : colors.gray400
  const iconColor = isSelecting ? colors.primary : colors.gray600
  const optionContainerStyle: StyleProp<ViewStyle> = isSelecting
    ? { borderColor: colors.primary }
    : editable
    ? { borderColor: colors.gray600 }
    : { borderColor: colors.gray600, backgroundColor: colors.gray400 }

  return (
    <TouchableWithoutFeedback onPress={showActionSheet}>
      <View style={[containerStyle]}>
        <Text allowFontScaling={false}>{title}</Text>
        <View style={[styles.optionContainer, optionContainerStyle]}>
          <Text style={[styles.text, { color: textColor }]}>{text || placeHolder || ' '}</Text>
          <Entypo name='chevron-thin-down' size={size[4]} color={iconColor} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    fontSize: size[4],
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    marginTop: size[1],
    borderRadius: size[2],
  },
  errorText: {
    color: colors.danger,
  },
})
