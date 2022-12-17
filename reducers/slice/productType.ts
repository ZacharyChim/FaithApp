import { IGetCategories } from './categoryType'
import { IImages } from '../types'

interface IProductColor {
    data: {
        id: number
        attributes: {
            hex: string
            name: string
        }
    }
}

interface IProductSize {
    data: {
        id: number
        attributes: {
            name: string
        }
    }
}

interface IAvailability {
    amount: number
    id: number
    product_color: IProductColor
    product_size: IProductSize
}


export interface IProduct {
    availability: IAvailability[]
    description: string
    images: IImages
    name: string
    price: number
    product_categories: IGetCategories[]
    id: number
}

export interface IProductsGet {
    data: {
        attributes: IProduct
        id: number
    }[]
}