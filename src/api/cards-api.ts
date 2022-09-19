import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const cardsAPI = {
    setCards(values: CardsGetRequestDataType) {
        return instance.get<GetCardsResponseType>('cards/card', { params: values });
    },
    // createPack(params:CreatePackRequestType) {
    //     return instance.post<CreatePackRequestType,any>('/cards/pack', params)
    // },
    // deletePack(id:string) {
    //     return instance.delete(`/cards/pack`,{ params: { id }})
    // },
    // updatePack(cardsPack: {
    //     _id: string,
    //     name?:string,
    //     cardCover?:string
    // }) {
    //     return instance.put(`/cards/pack`,{cardsPack})
    // },

}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}

export type CardsStateType = CardType[]

// types
export type CardsGetRequestDataType={
    cardAnswer?:string;
    cardQuestion?:string;
    cardsPack_id:string;
    min?:number;
    max?:number;
    sortCards?:number;
    page?:number;
    pageCount?:number;
}
export type GetCardsResponseType = {
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: string
    packUpdated: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}


// export type PacksGetRequestType = {
//     params: PacksGetRequestDataType
// }
//
// export type PacksGetRequestDataType = {
//     packName?: string // не обязательно
//     min?: number // не обязательно
//     max?: number // не обязательно
//     sortPacks?: number // не обязательно
//     page?: number // не обязательно
//     pageCount?: number // не обязательно
//     user_id?: string// чьи колоды не обязательно, или прийдут все
// }
// export type CardPacksType = {
//     _id: string
//     user_id?: string
//     name?: string
//     cardsCount?: number
//     created?: string
//     updated?: string
// }
//
// export type PacksGetResponseDataType = {
//     cardPacks: Array<CardPacksType>
//     cardPacksTotalCount: number// количество колод
//     maxCardsCount: number
//     minCardsCount: number
//     page: number // выбранная страница
//     pageCount: number// количество элементов на странице
// }
// // export type CreatePackRequestType= {
// //     cardsPack: {
// //         name: string, // если не отправить будет таким
// //         deckCover?: string, // не обязателен
// //         private?: boolean// если не отправить будет такой
// //     }
//
//     export type CreatePackRequestType= {
//     cardsPack: {
//         name: string, // если не отправить будет таким
//         deckCover?: string, // не обязателен
//         private?: boolean// если не отправить будет такой
//     }
// }
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
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

