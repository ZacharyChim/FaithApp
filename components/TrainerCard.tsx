import React, { Component } from 'react'
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'
import { View } from './Themed'

interface Props {
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ViewStyle>
  imageUri: ImageSourcePropType
  name: string
}

export default class TrainerCard extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, this.props.imageStyle]}
            source={this.props.imageUri}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    flex: 1,

    resizeMode: 'contain',
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
