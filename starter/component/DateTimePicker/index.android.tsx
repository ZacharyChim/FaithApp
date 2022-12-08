import DateTimePicker from '@react-native-community/datetimepicker'
import { Appearance, Platform } from 'react-native'
import { colors } from '../../themes/colors'
import { IDateTimePickerProps } from '.'


export default function Picker({ minimumDate, date, mode, onChange, isShow }: IDateTimePickerProps) {
  if (!isShow) {
    return null
  }
  return (
    <DateTimePicker
      minimumDate={minimumDate}
      value={date}
      mode={mode}
      is24Hour={true}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      onChange={onChange}
      style={{ flex: 1, backgroundColor: Appearance.getColorScheme() === 'dark' ? colors.gray600 : colors.white }}
    />
  )
}
