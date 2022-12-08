import { colors } from '../themes/colors'
import { ReactNode } from 'react'
import { size } from '../themes/size'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from './Text'


type IType = 'hightLight' | 'outLine'

interface IInputChipProps {
  title: string
  left?: ReactNode
  right?: ReactNode
  type?: IType
  onPress?: () => void
}

export const InputChip = ({ title, left, right, type = 'outLine', onPress }: IInputChipProps) => {
  const content = (type: IType): StyleProp<ViewStyle> => {
    switch (type) {
      case 'hightLight':
        return { borderColor: colors.primaryLight, backgroundColor: colors.primaryLight }
      case 'outLine':
        return { borderColor: colors.dark }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container]}>
        <View style={[styles.content, content(type)]}>
          {left && <View style={styles.left}>{left}</View>}
          <Text.Description style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
            {title}
          </Text.Description>
          {right && <View style={styles.right}>{right}</View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    maxWidth: 200,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: size[2],
    paddingHorizontal: size[4],
    paddingVertical: size[2],
  },
  left: {
    marginRight: size[2],
  },
  right: {
    marginLeft: size[2],
  },
  title: { flex: 1 },
})
