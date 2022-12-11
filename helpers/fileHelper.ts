import { api } from './../starter/helper/api'
import { IImageOutput } from '@starter'
import { type } from 'ramda'

interface IFileResponse {
    id: number
}

type IUploadFileResponse = IFileResponse[]

export const uploadFile = async (file: IImageOutput) => {
    const fromData = new FormData()
    // @ts-ignore
    fromData.append('files', file)
    const response = await api().post<IUploadFileResponse>('/upload', fromData)
    if (response.status === 400) {
        // For web
        fromData.append('files', file.base64)
        const newResponse = await api().post<IUploadFileResponse>('/upload', fromData)
        return newResponse.data?.[0].id || 0
    } else {
        return response.data?.[0].id || 0
    }
}