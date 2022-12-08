import { colors } from '../themes/colors'
import { size } from '../themes/size'
import { StyleSheet, Text as BaseText, TextProps } from 'react-native'


export const Text = (props: TextProps) => {
  return <BaseText allowFontScaling={false} style={{ fontSize: size[4], fontWeight: '400' }} {...props} />
}

Text.H1 = (props: TextProps) => {
  return <Text {...props} style={[styles.text, { fontSize: size[6], fontWeight: '400' }, props.style]} />
}

Text.H2 = (props: TextProps) => {
  return <Text {...props} style={[styles.text, { fontSize: size[5], fontWeight: '500' }, props.style]} />
}

Text.H3 = (props: TextProps) => {
  return <Text {...props} style={[styles.text, { fontSize: size[4], fontWeight: '700' }, props.style]} />
}

Text.Description = (props: TextProps) => {
  return <Text {...props} style={[styles.text, { fontSize: size[3], fontWeight: '500' }, props.style]} />
}

Text.Caption = (props: TextProps) => {
  return <Text {...props} style={[styles.text, { fontSize: size[3], fontWeight: '400' }, props.style]} />
}

const styles = StyleSheet.create({
  text: {
    color: colors.dark,
  },
})
