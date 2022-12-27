interface IPutClient {
    data: {
        users_permissions_user: string
        phone: string
        Address: string
    }
}

interface IPostUser {
    username: string
    email: string
    password: string
}

interface IUserInfoRegisterRequest {
    username: string
    email: string
    password: string
    phone: string
    address: string
}

interface IUserInfoRegisterResponse {
    jwt: string
    user: {
        address: string
        blocked: boolean
        confirmed: boolean
        email: string
        id: number
        phone: string
        username: string
    }
}

interface IUser {
    username: string
    email: string
    password: string
    phone: string
    address: string
}