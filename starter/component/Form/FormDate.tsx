import DateTimePicker from './../DateTimePicker'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../../themes/colors'
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
  } from 'react-native'
import { size } from '../../themes/size'
import { Text } from '../Text'


interface IProps {
  mode: 'time' | 'date'
  placeHolder: string
  error?: string
  style?: object
  setTime: (time: Date) => void
  text?: string
  minimumDate?: Date
  title: string
  editable?: boolean
}

export const FormDate = ({
  mode,
  placeHolder,
  error,
  style,
  setTime,
  text,
  minimumDate,
  title,
  editable = true,
}: IProps) => {
  const [date, setDate] = useState(new Date())
  const [isShow, setIsShow] = useState(false)

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date
    setIsShow(Platform.OS === 'ios')
    setTime(currentDate)
    setDate(currentDate)
  }

  const onPressShouldShow = () => {
    setIsShow(!isShow)
  }

  const textStyle: StyleProp<TextStyle> = !text ? { color: colors.gray600 } : { color: colors.dark }
  const iconColor = !text ? colors.gray600 : colors.dark
  const containerStyle: StyleProp<ViewStyle> = editable
    ? { backgroundColor: colors.white }
    : { backgroundColor: colors.gray400 }

  return (
    <View style={[style]}>
      <Text>{title}</Text>
      {Platform.OS !== 'web' && (
        <TouchableWithoutFeedback onPress={onPressShouldShow}>
          <View style={[styles.textInputContainer, containerStyle]}>
            <Text style={[styles.text, textStyle]}>{text || placeHolder}</Text>
            <AntDesign name='calendar' size={size[5]} color={iconColor} />
          </View>
        </TouchableWithoutFeedback>
      )}
      <DateTimePicker
        minimumDate={minimumDate}
        date={date}
        mode={mode}
        onChange={onChange}
        onPressShouldShow={onPressShouldShow}
        isShow={isShow}
        editable={editable}
      />
      <Text style={styles.errorText}>{!!error ? error : ' '}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
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
  errorText: {
    color: colors.secondary,
  },
})
