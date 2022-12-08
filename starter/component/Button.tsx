import { colors } from '../themes/colors'
import { size } from '../themes/size'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from './Text'


type IStyleType = 'outline' | 'neat' | 'normal'

interface IButtonProps {
  title: string
  onPress: () => void
  type?: IStyleType
  color?: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export const Button = ({ title, onPress, type = 'normal', color, style, disabled }: IButtonProps) => {
  const container = (type: IStyleType): StyleProp<ViewStyle> => {
    switch (type) {
      case 'normal':
        return {
          backgroundColor: color || colors.primaryDark,
          borderWidth: 1,
          borderColor: color || colors.primaryDark,
        }
      case 'neat':
        return {}
      case 'outline':
        return { borderWidth: 1, borderColor: color || colors.primaryDark, backgroundColor: colors.white }
    }
  }

  const text = (type: IStyleType): StyleProp<TextStyle> => {
    switch (type) {
      case 'normal':
        return { color: colors.white }
      case 'neat':
        return { color: color || colors.primaryDark }
      case 'outline':
        return { color: color || colors.primaryDark }
    }
  }
  return (
    <View style={[style, disabled ? { opacity: 0.4 } : {}]}>
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        <View style={[styles.container, container(type)]}>
          <Text.H3 style={[styles.text, text(type)]}>{title}</Text.H3>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size[3],
    borderRadius: size[2],
    paddingHorizontal: size[6],
  },
  text: {},
})
