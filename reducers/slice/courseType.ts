import { ITrainerAttributes } from './trainerType'

export interface ICourseAttributes {
    available_amount: 5
    available_date: number[]
    available_month: number[]
    end: string // "17:00:00.000"
    name: string
    start: string // "16:00:00.000"
    trainer: { data: { id: number, attributes: ITrainerAttributes } }
}

export interface ICourse extends ICourseAttributes {
    id: number
}

export interface IGetCourse {
    data: { attributes: ICourseAttributes, id: number }[]
}

export interface ICourseBookRequest {
    course: number // "1",
    starting: string // "12:54:00.000",
    users_permissions_user: number // "5"
}
