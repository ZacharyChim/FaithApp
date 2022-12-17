import { IImage } from './../types'

export interface ICategory {
    name: string
    image: IImage
    id: number
}

export interface IGetCategories {
    data: {attributes: ICategory, id: number}[]
}