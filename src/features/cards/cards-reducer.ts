import {Dispatch} from 'redux'
import {setAppStatusAC} from '../app/app-reducer'
import {handleServerNetworkError} from "../../utils/error-utils";
import {cardsAPI, CardsGetRequestDataType, CardsStateType,} from "../../api/cards-api";
import {AppThunk} from "../../api/store";
import {AuthActionsType, setIsLoggedInAC} from "../auth/registration/auth-reducer";


const initialState = {
    cards: [] as CardsStateType,
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 5,
    sortCards: '0updated',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    currentPage: 1
    // myPacksMode: false,
    // newPack: {
    //     cardsPack: {
    //         name: "Dina's ",
    //         deckCover: "",// не обязателен
    //         private: false,// если не отправить будет такой
    //     }
    // },
    // packName:''
    // ,
    // packNameSearch:'',
    // user_id:'',
    // min:0,
    // max:100,
}


export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, cards: action.cards}
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "cards/SET-PAGE":
            return {...state, page: action.page}

        default:
            return state
    }
}
// actions

export const setCardsAC = (cards: CardsStateType) =>
    ({type: 'cards/SET-CARDS', cards} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) =>
    ({type: 'cards/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)
export const setCardPageAC = (page:number) =>
    ({type: 'cards/SET-PAGE',page} as const)



// thunks

// export const setCardsTC = (cardsPack_id: string): AppThunk => (dispatch) => {
export const setCardsTC = (cardsData:CardsGetRequestDataType): AppThunk => (dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    // cardsAPI.setCards({cardsPack_id})
    cardsAPI.setCards(cardsData)
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
            dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// export const setPacksTC = (packsData: PacksGetRequestDataType): AppThunk => (dispatch, getState) => {
//     // debugger
//     dispatch(setAppStatusAC('loading'))
//     packsAPI.setPacks({
//         packName: getState().packs.packNameSearch,
//         min: getState().packs.min,
//         max: getState().packs.max,
//         sortPacks: packsData?.sortPacks,
//         page: packsData.page,
//         pageCount: packsData.pageCount,
//         user_id: getState().packs.user_id,
//     })
//
//         .then((res) => {
//             dispatch(setPacksAC(res.data))
//             dispatch(setAppStatusAC('succeeded'))
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const createPacksTC = (newPack: CreatePackRequestType): AppThunk => (dispatch: Dispatch) => {
//     // debugger
//     dispatch(setAppStatusAC('loading'))
//     packsAPI.createPack(newPack)
//         .then((res) => {
//             dispatch(createNewPackAC(res.data))
//             dispatch(setAppStatusAC('succeeded'))
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const deletePackTC = (id:string): AppThunk => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     packsAPI.deletePack(id)
//         .then(() => {
//             // @ts-ignore
//             dispatch(setPacksTC({}))
//             dispatch(setAppStatusAC('succeeded'))
//
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const updatePackTC = (cardsPack: CardPacksType): AppThunk => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     packsAPI.updatePack(cardsPack)
//         .then(() => {
//             // @ts-ignore
//             dispatch(setPacksTC({}))
//             dispatch(setAppStatusAC('succeeded'))
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }


// types
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof setCardPageAC>
    // | ReturnType<typeof setMinMaxValueAC>
    // | ReturnType<typeof createNewPackAC>
    // | ReturnType<typeof setIsLoggedInAC>
    // | ReturnType<typeof setPackNameForSearchAC>
    // | ReturnType<typeof setMyPacksAC>
    // | ReturnType<typeof setCurrentPageAC>
    | AuthActionsType
type InitialStateType = typeof initialState






