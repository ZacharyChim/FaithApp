import { colors } from './colors'
import {
  Entypo,
  EvilIcons,
  FontAwesome5,
  Ionicons
  } from '@expo/vector-icons'
import { size as ThemeSize } from './size'


type IIconName = 'right' | 'down' | 'up' | 'user' | 'left' | 'unchecked' | 'checked' | 'close'

interface IProps {
  name: IIconName
  color?: string
  size?: number
  onPress?: () => void
}

export const Icons = ({ name, color, size, onPress }: IProps) => {
  switch (name) {
    case 'left':
      return (
        <Entypo
          name='chevron-small-left'
          size={size || ThemeSize[5]}
          color={color || colors.gray800}
          onPress={onPress}
        />
      )
    case 'right':
      return (
        <Entypo
          name='chevron-small-right'
          size={size || ThemeSize[5]}
          color={color || colors.gray800}
          onPress={onPress}
        />
      )
    case 'down':
      return (
        <Entypo
          name='chevron-small-down'
          size={size || ThemeSize[5]}
          color={color || colors.gray800}
          onPress={onPress}
        />
      )
    case 'up':
      return (
        <Entypo name='chevron-small-up' size={size || ThemeSize[5]} color={color || colors.gray800} onPress={onPress} />
      )
    case 'user':
      return (
        <FontAwesome5 name='user-alt' size={size || ThemeSize[5]} color={color || colors.gray800} onPress={onPress} />
      )
    case 'unchecked':
      return (
        <Ionicons
          name='ios-square-outline'
          size={size || ThemeSize[5]}
          color={color || colors.gray800}
          onPress={onPress}
        />
      )
    case 'checked':
      return (
        <Ionicons
          name='ios-checkbox-outline'
          size={size || ThemeSize[5]}
          color={color || colors.gray800}
          onPress={onPress}
        />
      )
    case 'close':
      return <EvilIcons name='close' size={size || ThemeSize[5]} color={color || colors.gray800} onPress={onPress} />
  }
}
