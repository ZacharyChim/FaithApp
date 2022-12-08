import { colors } from '../themes/colors'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
  } from 'react-native'
import { ReactNode } from 'react'
import { size } from '../themes/size'
import { Spacing } from './Spacing'
import { Text } from './Text'


interface IRowProps {
  title?: string
  description?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
  otherContent?: ReactNode
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export const Row = ({
  title,
  description,
  leftIcon,
  rightIcon,
  children,
  onPress,
  containerStyle,
  otherContent,
}: IRowProps) => {
  const Content = () => (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!description && (
          <Text style={styles.description} selectable>
            {description}
          </Text>
        )}
        {children}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {otherContent && (
        <View>
          <Spacing height={size[1]} />
          {otherContent}
        </View>
      )}
    </View>
  )

  if (onPress) {
    return <Pressable onPress={onPress}>{<Content />}</Pressable>
  } else {
    return <Content />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: size[4],
    paddingVertical: size[3],
    backgroundColor: colors.white,
    borderBottomColor: colors.gray400,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftIcon: {
    marginRight: size[4],
  },
  rightIcon: {},
  description: {
    color: colors.gray800,
    textAlign: 'right',
  },
  title: {
    flex: 1,
  },
})
