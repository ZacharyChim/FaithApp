import DatePicker from 'react-datepicker'
import { colors } from '../../themes/colors'
import { forwardRef, useState } from 'react'
import { IDateTimePickerProps } from '.'
import { Pressable, StyleSheet, View } from 'react-native'
import { size } from '../../themes/size'
import { Text } from '../Text'
import 'react-datepicker/dist/react-datepicker.css'



export default function Picker({ minimumDate, date, mode, onChange, editable }: IDateTimePickerProps) {
  const [startDate, setStartDate] = useState(new Date())

  const CustomInput = forwardRef<View, { value?: string; onClick?: () => void }>(({ value, onClick }, ref) => (
    <Pressable onPress={editable ? onClick : undefined} ref={ref}>
      <View style={[styles.textInputContainer, { backgroundColor: editable ? colors.white : colors.gray400 }]}>
        <Text>{value}</Text>
      </View>
    </Pressable>
  ))

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date)
        onChange(undefined, date)
      }}
      showTwoColumnMonthYearPicker
      isClearable={false}
      showTimeSelect={mode === 'time'}
      customInput={<CustomInput />}
    />
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    fontSize: size[4],
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    marginTop: size[1],
    borderRadius: size[2],
    alignItems: 'center',
  },
})
