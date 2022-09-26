import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const packsAPI = {
    setPacks(params: PacksGetRequestDataType) {
        return instance.get<PacksGetRequestDataType,AxiosResponse<PacksGetResponseDataType>>('cards/pack', {params});
    },
    createPack(params:CreatePackRequestType) {
        return instance.post<CreatePackRequestType,any>('/cards/pack', params)
    },
    deletePack(id:string) {
        return instance.delete(`/cards/pack`,{ params: { id }})
    },
    updatePack(cardsPack: {
        _id: string,
        name?:string,
        cardCover?:string
    }) {
        return instance.put(`/cards/pack`,{cardsPack})
    },

    // createTodolist(title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    // },
    // deleteTodolist(id: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${id}`);
    // },
    // updateTodolist(id: string, title: string) {
    //     return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
    // },
    // getTasks(todolistId: string) {
    //     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    // },
    // deleteTask(todolistId: string, taskId: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    // },
    // createTask(todolistId: string, title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    // },
    // updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    //     return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    // }

}

// types
export type PacksGetRequestType = {
    params: PacksGetRequestDataType
}

export type PacksGetRequestDataType = {
    packName?: string // не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string// чьи колоды не обязательно, или прийдут все
}
export type CardPacksType = {
    _id: string
    user_id?: string
    name?: string
    cardsCount?: number
    created?: string
    updated?: string
}

export type PacksGetResponseDataType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number// количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number// количество элементов на странице
}
// export type CreatePackRequestType= {
//     cardsPack: {
//         name: string, // если не отправить будет таким
//         deckCover?: string, // не обязателен
//         private?: boolean// если не отправить будет такой
//     }

    export type CreatePackRequestType= {
    cardsPack: {
        name: string, // если не отправить будет таким
        deckCover?: string, // не обязателен
        private?: boolean// если не отправить будет такой
    }
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
// export type CardPackType = {
//     _id: string
//     user_id: string
//     user_name: string
//     private: boolean
//     name: string
//     path: string
//     grade: number
//     shots: number
//     cardsCount: number
//     type: string
//     rating: number
//     created: string
//     updated: string
//     more_id: string
//     __v: number
//     deckCover?: string | null
// }

