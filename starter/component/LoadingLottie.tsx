import LottieView from 'lottie-react-native'
import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View
  } from 'react-native'
import { colors } from '../themes/colors'
import { images } from '../themes/images'


type Props = {
  isVisible: boolean
  isIndicator?: boolean
}
export const LoadingLottie = ({ isVisible, isIndicator }: Props) => {
  const renderLoadingSpin = () => {
    return Platform.OS === 'android' || Platform.OS === 'web' || isIndicator ? (
      <ActivityIndicator size='large' color={colors.primary} style={styles.indicator} />
    ) : (
      <LottieView source={images.loading} style={{ height: 250 }} autoPlay loop />
    )
  }

  if (isVisible) {
    return (
      <View style={styles.animationContainer}>
        <View style={[styles.animationContainer, styles.background]} />
        <View style={styles.animationContainer}>{renderLoadingSpin()}</View>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: colors.white,
    opacity: 0.8,
  },
  indicator: {
    alignSelf: 'center',
  },
})
