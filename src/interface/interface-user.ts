export interface IUser {
    email: string,
    password: string
}

export interface IData {
    code: number,
    status: string,
    userData: {
        email?: string,
        token?: string
    }
}

