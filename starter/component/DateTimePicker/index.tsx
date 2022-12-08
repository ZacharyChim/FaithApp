import { View } from 'react-native'

export interface IDateTimePickerProps {
  mode: 'time' | 'date'
  date: Date
  minimumDate?: Date
  onChange: (event: any, selectedDate: any) => void
  isShow: boolean
  onPressShouldShow: () => void
  editable?: boolean
}

export default function Picker({ minimumDate, date, mode, onChange }: IDateTimePickerProps) {
  return <View />
}
