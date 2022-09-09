import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserDataResponseType>>(`/auth/login`, data)
    },
    register(data: RegisterParamsType) {
        return instance.post<RegisterParamsType, ResponseRegisterType>(`/auth/register`, data)
    },
    me() {
        return instance.post<{}, AxiosResponse<UserDataResponseType>>('/auth/me', {})
    },
    logout() {
        return instance.delete<UniversalResponseType>(`/auth/me`)
    },
    updateUser(name: string) {
        return instance.put<{ name: string }, AxiosResponse<ResponseType>>('/auth/me', {name})
    },
    forgotPassword(email: string) {
        const payload: ForgotPasswordParamsType = {
            email,
            from: "<d.r.semenova@yandex.ru>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/CardsProject#/set-new-password/$token$'>link</a></div>`
            // message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='https://DinaSem.github.io/CardsProject#/set-new-password/$token$'>link</a></div>`

        }
        return instance.post <ForgotPasswordParamsType, AxiosResponse<UniversalResponseType>>('/auth/forgot', payload)
    },
    newPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ password: string, resetPasswordToken: string }, AxiosResponse<UniversalResponseType>>('/auth/set-new-password', {
            password,
            resetPasswordToken
        })
    },
}


// types

export type UserDataResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type ResponseRegisterType = {
    addedUser: {} // чтобы посмотреть как выглядит созданный юзер
    error?: string;
}
export type UpdateUserResponseType = {
    updatedUser: {}
    error?: string
}
export type UniversalResponseType = {
    updatedUser: {}
    error?: string
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type UpdateUserParamsType = {
    name: string
    // avatar?: string
}
export type ForgotPasswordParamsType = {
    email: string // кому восстанавливать пароль
    from: string// можно указать разработчика фронта
    message: string// хтмп-письмо, вместо $token$ бэк вставит токен
}
export type NewtPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}




