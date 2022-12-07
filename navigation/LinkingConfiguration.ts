import * as Linking from 'expo-linking'
import { LinkingOptions } from '@react-navigation/native'
import { RootStackParamList } from '../types'


/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */



const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: 'home',
          Products: 'products',
          Booking: 'booking',
          Cart: 'cart',
          Profile: 'profile'
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
