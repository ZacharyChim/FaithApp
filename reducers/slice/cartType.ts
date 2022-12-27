import { IImageOutput } from './../../starter/component/Wrapper/ChooseImageWrapper'
import { IProduct } from './productType'

export interface ICartInfo {
    delivery: string
    remark?: string
}


export type ICartItem = {
    product: IProduct
    color: string
    size: string
    quantity: string
}

export type ICartProductList = {
    items: ICartItem[]
}

export interface ICreateOrderRequest {
    image: IImageOutput
}

export interface IUploadImageResponse {
    id: number
    url: string
}