import DateTimePicker from '@react-native-community/datetimepicker'
import {
  Appearance,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
  } from 'react-native'
import { colors } from '../../themes/colors'
import { IDateTimePickerProps } from '.'
import { size } from '../../themes/size'
import { Text } from '../Text'


export default function Picker({ minimumDate, date, mode, onChange, isShow, onPressShouldShow }: IDateTimePickerProps) {
  return (
    <Modal transparent={true} visible={isShow}>
      <View style={styles.container} />
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={onPressShouldShow}>
          <View style={styles.okContainer}>
            <Text.H2 style={styles.ok} allowFontScaling={false}>
              OK
            </Text.H2>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePicker
          minimumDate={minimumDate}
          value={date}
          mode={mode}
          is24Hour={true}
          display={'spinner'}
          onChange={onChange}
          style={styles.picker}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.white,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.6,
  },
  contentContainer: {
    height: 300,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.dark,
  },
  okContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.gray200,
    paddingHorizontal: size[3],
    paddingVertical: size[2],
  },
  ok: {
    color: colors.primary,
  },
  picker: {
    flex: 1,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? colors.gray600 : colors.white,
  },
})
