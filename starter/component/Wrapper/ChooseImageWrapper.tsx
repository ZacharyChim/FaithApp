import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Alert, TouchableWithoutFeedback } from 'react-native'
import { getFilename } from '../../helper/utility'
import { pathOr } from 'ramda'
import { t } from '../../helper/i18n'
import { useActionSheet } from '@expo/react-native-action-sheet'



export type IImageOutput = ImagePicker.ImagePickerResult & { name: string; base64: string }

interface IProps {
  onSetImage?: (image: IImageOutput) => void
  children: React.ReactNode
}

export const ChooseImageWrapper = ({ onSetImage, children }: IProps) => {
  const { showActionSheetWithOptions } = useActionSheet()

  const resultHander = (result: ImagePicker.ImagePickerResult) => {
    const uri: string = pathOr('', ['uri'], result)
    if (uri) {
      const name = getFilename(uri)
      // @ts-ignore
      onSetImage?.({ ...result, name })
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(t('permissiontDenied'), t('noPhotoLibrayPermisstionDescription'), [
        {
          text: t('ok'),
        },
      ])
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    })

    resultHander(result)
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(t('permissiontDenied'), t('noCameraPermissionDescription'), [
        {
          text: t('ok'),
        },
      ])
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    })

    resultHander(result)
  }

  const onPressUpload = () => {
    if (!onSetImage) {
      return
    }
    const options = [t('takePhoto'), t('chooseFromLibrary'), t('cancel')]
    const cancelButtonIndex = 2
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (index) => {
        switch (index) {
          case 0:
            await takePhoto()
            break
          case 1:
            await pickImage()
            break
          default:
            break
        }
      }
    )
  }

  return <TouchableWithoutFeedback onPress={onPressUpload}>{children}</TouchableWithoutFeedback>
}
