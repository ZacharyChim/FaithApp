import { ITrainerAttributes } from './trainerType'
import { number } from 'prop-types'
import { Pagination } from './../../starter/component/Pagination/index'

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
    date: string // "2022-12-28"
}

export interface IMyCourse {
    id: number,
    attributes: {
        starting: string // "16:00:00.000"
        status: "pending",
        date: string // "2022-12-28"
        course: {
            data: {attributes: ICourse, id: number}
        }
    }
}

export interface IMyCourseResponse {
    data: IMyCourse[]
}