import { View } from 'react-native'

interface IProps {
  width?: number
  height?: number
}

export const Spacing = ({ width, height }: IProps) => {
  return <View style={[{ width, height }]}></View>
}
