import React, { FC } from 'react'
import { Button } from 'react-native-paper'


interface IButtonToggle {
  onPress: () => void
  title: string
  color: '#FFC107' | '#28A745'
}

const ButtonToggle: FC<IButtonToggle> = ({onPress, title, color}) => {
  return (
    <Button
      textColor={'white'}
      buttonColor={color}
      style={{ borderRadius: 10 }}
      onPress={onPress}
    >
      {title}
    </Button>
  )
}

export default ButtonToggle
