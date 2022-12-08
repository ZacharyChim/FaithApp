import { AntDesign } from '@expo/vector-icons'
import { ChooseImageWrapper, IImageOutput } from '../Wrapper/ChooseImageWrapper'
import { colors } from '../../themes/colors'
import { InputChip } from '../InputChip'
import { size } from '../../themes/size'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
  } from 'react-native'
import { Text } from '../Text'
import { useState } from 'react'


interface IProps {
  placeHolder?: string
  containerStyle?: StyleProp<ViewStyle>
  onPickImage: (image?: IImageOutput) => void
  error?: string
  title: string
}

export const FormImage = ({ onPickImage, placeHolder, containerStyle, error, title }: IProps) => {
  const [image, setImage] = useState<IImageOutput | undefined>(undefined)

  const onSetImage = (output: IImageOutput) => {
    setImage(output)
    onPickImage(output)
  }

  const onClearImage = () => {
    setImage(undefined)
    onPickImage(undefined)
  }

  const titleStyle: StyleProp<TextStyle> = !!error ? { color: colors.danger } : {}
  const input: StyleProp<ViewStyle> = !!error ? { borderColor: colors.danger } : { borderColor: colors.gray600 }

  return (
    <ChooseImageWrapper onSetImage={image ? undefined : onSetImage}>
      <View style={[containerStyle]}>
        <Text style={titleStyle}>{title}</Text>
        <View style={[styles.optionContainer, input]}>
          {image ? (
            <InputChip
              title={image.name}
              onPress={onClearImage}
              right={<AntDesign name='close' size={size[4]} color='black' />}
            />
          ) : (
            <Text style={[styles.text]}>{placeHolder ?? ' '}</Text>
          )}
        </View>
        <Text style={styles.errorText} allowFontScaling={false}>
          {!!error ? error : ' '}
        </Text>
      </View>
    </ChooseImageWrapper>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: colors.gray600,
    fontSize: size[4],
  },
  optionContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    fontSize: size[4],
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    marginTop: size[1],
    borderRadius: size[2],
  },
  errorText: {
    color: colors.danger,
  },
})
