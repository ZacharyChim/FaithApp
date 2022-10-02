import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  Dimensions,
} from 'react-native'

interface IButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

const width = Dimensions.get('window').width

export const Button = ({ title, onPress, style, disabled }: IButtonProps) => {
  return (
    <View style={[style, disabled ? { opacity: 0.4 } : {}]}>
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    elevation: 3,
  },
  text: { color: 'white', fontSize: 20 },
})
