import { IImage } from './../types'

export interface ICategory {
    name: string
    image: IImage
}

export interface IGetCategories {
    data: {attributes: ICategory}[]
}