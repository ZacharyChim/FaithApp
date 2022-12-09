import React, { FC } from 'react'
import { View } from './Themed'
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'


interface ITrainerCard {
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  imageUri: string
  name: string
}

export const TrainerCard: FC<ITrainerCard> = ({style, imageStyle, imageUri, name}) => {
  return <View style={[styles.container, style]}>
  <View style={styles.imageContainer}>
    <Image
      style={[styles.image, imageStyle]}
      source={{uri: imageUri}}
    />
  </View>
  <View style={styles.textContainer}>
    <Text>{name}</Text>
  </View>
</View>
}

// export default class TrainerCard extends React.Component<Props> {
//   render() {
//     return (
//       <View style={[styles.container, this.props.style]}>
//         <View style={styles.imageContainer}>
//           <Image
//             style={[styles.image, this.props.imageStyle]}
//             source={{uri: this.props.imageUri}}
//           />
//         </View>
//         <View style={styles.textContainer}>
//           <Text>{this.props.name}</Text>
//         </View>
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
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
