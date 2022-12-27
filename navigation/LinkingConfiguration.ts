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
          Home: {
            path: 'home',
            screens: {
              HomePage: '',
              TeamPage: 'team',
              TrainerPage: 'trainer',
              JoinUsPage: 'join_us'
            }
          },
          Products: {
            path: 'products',
            screens: {
              ProductsPage: '',
              CategoryPage: 'category',
              ProductPage: 'detail'
            }
          },
          Booking: {
            path: 'booking',
            screens: {
              BookingPage: '',
              CalendarPage: 'calendar'
            }
          },
          Cart: {
            path: 'cart',
            screens: {
              CartPage: '',
              InfoPage: 'info',
              ConfirmPage: 'confirm',
              EmptyPage: 'empty',
            }
          },
          Profile: {
            path: 'profile',
            screens: {
              SettingPage: 'setting',
              DetailPage: 'detail',
              EditPage: 'edit',
              ContactPage: 'contact',
              LoginPage: 'login'
            }
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
