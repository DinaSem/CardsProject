import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL:  "https://neko-back.herokuapp.com/2.0",
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const cardsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }

}
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
        return instance.put<{name:string}, AxiosResponse<ResponseType>>('/auth/me', {name})
    },
    forgotPassword(email: string) {
        const payload:ForgotPasswordParamsType={
            email,
            from: "test-front-admin <d.r.semenovaa@yandex.ru>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`

        }
        return instance.post <ForgotPasswordParamsType, AxiosResponse<UniversalResponseType>>('/auth/forgot', payload)
    },
    newPassword(data: NewtPasswordParamsType) {
        return instance.post <NewtPasswordParamsType, AxiosResponse<UniversalResponseType>>('/auth/set-new-password', data)
    },
}


// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
