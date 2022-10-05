import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const toggleText = (text) => {
  if (text === 'Booked') {
    return 'Cancel?'
  } else if (text === 'Book') {
    return 'Booked'
  } else if (text === 'Cancel?') {
    return 'Book'
  }
}

const toggleColor = (text) => {
  if (text === 'Booked') {
    return ['#FFC107', 'black']
  } else if (text === 'Cancel?') {
    return ['black', 'white']
  } else {
    return ['#28A745', 'black']
  }
}

const ButtonToggle = (props) => {
  const [buttonText, setButtonText] = useState(props.buttonText)
  const [textColor, setTextColor] = useState(props.textColor)
  const [buttonColor, setButtonColor] = useState(props.buttonColor)

  function doChanges() {
    setButtonText(toggleText(buttonText))
    console.log(buttonText)
    let colors = toggleColor(buttonText)
    setButtonColor(colors[0])
    setTextColor(colors[1])
  }

  return (
    <Button
      textColor={textColor}
      buttonColor={buttonColor}
      style={{ borderRadius: 10 }}
      onPress={() => {
        doChanges()
      }}
    >
      {buttonText}
    </Button>
  )
}

export default ButtonToggle
