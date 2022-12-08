import React from 'react'
import { colors } from '../../themes/colors'
import { size } from '../../themes/size'
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from '../Text'


interface IProps {
  placeHolder?: string
  containerStyle?: StyleProp<ViewStyle>
  onChangeText: (text: string) => void
  isPaasword?: boolean
  keyboardType?: 'default' | 'visible-password' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad'
  autoCapitalize?: 'none' | 'words'
  error?: string
  text?: string
  multiline?: boolean
  title?: string
  editable?: boolean
}

export function FormText({
  placeHolder,
  containerStyle,
  onChangeText,
  isPaasword,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  text = '',
  multiline = false,
  title,
  editable = true,
}: IProps) {
  const onChange = (text: string) => {
    onChangeText(text)
  }

  const titleStyle: StyleProp<TextStyle> = !!error ? { color: colors.danger } : {}
  const input: StyleProp<ViewStyle> = !!error
    ? { borderColor: colors.danger }
    : editable
    ? { borderColor: colors.gray600 }
    : { borderColor: colors.gray600, backgroundColor: colors.gray400 }

  return (
    <View style={[containerStyle]}>
      <Text style={titleStyle} allowFontScaling={false}>
        {!!title ? title : ' '}
      </Text>
      <TextInput
        allowFontScaling={false}
        placeholder={placeHolder}
        style={[styles.textInput, input, multiline ? { height: 100 } : {}]}
        placeholderTextColor={colors.gray600}
        onChangeText={onChange}
        secureTextEntry={isPaasword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        defaultValue={text}
        multiline={multiline}
        editable={editable}
      />
      {
        <Text style={styles.errorText} allowFontScaling={false}>
          {!!error ? error : ' '}
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.gray600,
  },
  textInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    fontSize: size[4],
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    borderRadius: size[2],
  },
  errorText: {
    color: colors.danger,
  },
})
