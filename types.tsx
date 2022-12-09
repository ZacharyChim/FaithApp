import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ImageSourcePropType } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'


/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */



declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type HomeStackParamList = {
  HomePage: undefined
  TeamPage: undefined
  TrainerPage: {
    id: number
  }
  JoinUsPage: undefined
}

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>

export type Product = {
  categoryId: number
  id: number
  name: string
  imageUri: ImageSourcePropType
  price: number
  discountPrice: number
  description: string
  color: Array<string>
  size: Array<string>
  stock: number
}

export type ProductStackParamList = {
  ProductsPage: undefined
  CategoryPage: {
    categoryId: number
  }
  ProductPage: {
    item: Product
  }
}

export type ProductStackScreenProps<
  Screen extends keyof ProductStackParamList
> = NativeStackScreenProps<ProductStackParamList, Screen>

export type CartStackParamList = {
  CartPage: undefined
  InfoPage: undefined
  ConfirmPage: undefined
  EmptyPage: undefined
}
export type CartStackScreenProps<Screen extends keyof CartStackParamList> =
  NativeStackScreenProps<CartStackParamList, Screen>

export type BookingStackParamList = {
  CalendarPage: undefined
  BookingPage: undefined
}
export type BookingStackScreenProps<
  Screen extends keyof BookingStackParamList
> = NativeStackScreenProps<BookingStackParamList, Screen>

export type ProfileStackParamList = {
  SettingPage: undefined
  DetailPage: undefined
  EditPage: undefined
  ContactPage: undefined
}

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>
  Products: NavigatorScreenParams<ProductStackParamList>
  Booking: NavigatorScreenParams<BookingStackParamList>
  Cart: NavigatorScreenParams<CartStackParamList>
  Profile: NavigatorScreenParams<ProfileStackParamList>
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
