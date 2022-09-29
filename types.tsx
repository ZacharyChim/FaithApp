/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImageSourcePropType } from 'react-native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type HomeStackParamList = {
  HomePage: undefined
  TeamPage: undefined
  TrainerPage: {
    id: string
    imageUri: ImageSourcePropType
    name: string
    description: string
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

export type CartProduct = {
  categoryId: number
  id: number
  name: string
  imageUri: ImageSourcePropType
  price: number
  discountPrice: number
  description: string
  color: string
  size: string
  quantity: number
}

export type CartProductList = {
  products: Array<CartProduct>
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

export type RootTabParamList = {
  Home: undefined
  Products: undefined
  Booking: undefined
  Cart: undefined
  Profile: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
