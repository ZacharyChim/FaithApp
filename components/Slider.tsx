import React from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native'

const { width } = Dimensions.get('window')
const height = width * 0.5 //50%

interface Props {
  images: Array<Array<string>>
}

export default class Slider extends React.Component<Props> {
  state = {
    active: 0,
  }

  change = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    )
    if (slide !== this.state.active) {
      this.setState({ active: slide })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          pagingEnabled
          horizontal
          onScroll={this.change}
          showsHorizontalScrollIndicator={false}
          style={styles.container}
        >
          {this.props.images.map((image, index) => (
            <ImageBackground
              key={index}
              source={{ uri: image[0] }}
              style={styles.image}
            >
              <Text style={styles.caption}>{image[1]}</Text>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {this.props.images.map((i, k) => (
            <Text
              key={k}
              style={
                k == this.state.active
                  ? styles.pagingActiveText
                  : styles.pagingText
              }
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { width: width - 30, height, borderRadius: 15 },
  image: {
    width: width - 30,
    height,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: { fontSize: width / 40, color: '#888', margin: 3 },
  pagingActiveText: { fontSize: width / 40, color: '#fff', margin: 3 },
  caption: { fontSize: width / 10, textAlign: 'center', color: '#fff' },
})
