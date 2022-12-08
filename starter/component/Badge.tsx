import { size } from '../themes/size'
import { StyleSheet, View } from 'react-native'
import { Text } from './Text'


export type IBadgeType = 'normal' | 'warning' | 'danger' | 'info' | 'other'

interface IProps {
  title: string
  type?: IBadgeType
}

export const Badge = ({ title, type = 'normal' }: IProps) => {
  const backgroundColor =
    type === 'normal'
      ? '#28A745'
      : type === 'warning'
      ? '#FFC107'
      : type === 'danger'
      ? '#DC3545'
      : type === 'info'
      ? '#17A2B8'
      : type === 'other'
      ? '#6C757D'
      : ''
  return (
    <View style={styles.container}>
      <View style={[styles.content, { backgroundColor }]}>
        <Text>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    borderRadius: size[2],
  },
})
