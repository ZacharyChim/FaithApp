import { IImage } from './../types'

type ITrainerStatuses = 'pending' | 'accepted' | 'rejected' | 'on-hold'
type ISexes = 'M' | 'F' | 'N/A'

export interface ITrainer {
    createdAt: string // "2022-12-08T15:38:01.809Z"
    description: string
    email: string //"peterchan19950202@gmail.com"
    first_name: string // "Peter"
    last_name: string // "Chan"
    name: string //"Peter Chan"
    phone: string // "62242242"
    publishedAt: string  //"2022-12-08T15:39:26.830Z"
    sex: ISexes // "M"
    status: ITrainerStatuses
    updatedAt: string // "2022-12-08T15:39:26.835Z"
    image: IImage
}