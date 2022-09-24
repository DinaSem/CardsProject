import {setAppStatusAC} from '../app/app-reducer'
import {handleServerNetworkError} from "../../utils/error-utils";
import {
    CardPacksType,
    CreatePackRequestType,
    packsAPI,
    PacksGetRequestDataType,
    PacksGetResponseDataType
} from "../../api/packs-api";
import {AppThunk} from "../../api/store";
import {AuthActionsType, setIsLoggedInAC} from "../auth/registration/auth-reducer";


const initialState = {
    currentPage:1,
    packNameSearch:'',
    user_id:'',
    min:0,
    max:100,
    packsData: {},
    myPacksMode: false,
    newPack: {
        cardsPack: {
            name: "Dina's ",
            deckCover: "",// не обязателен
            private: false,// если не отправить будет такой
        }
    },
    packName:''
} as PacksStateType

type PacksStateType = {
    currentPage:number
    packsData: PacksGetResponseDataType
    myPacksMode: boolean
    newPack: CreatePackRequestType
    packNameSearch:string
    user_id:string
    min:number
    max:number
    packName:string
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, packsData: action.packsData}
        case "packs/SET-MY-PACKS":
            return {...state, user_id: action.user_id}
        case "packs/SET-MIN-MAX-VALUE":
            return {
                ...state,
                    min: action.min,
                    max: action.max
            }
        case "packs/CREATE-PACK":
            return {...state, newPack: action.newPack}
        case "packs/SET-PACK-NAME-FOR-SEARCH":
            return {...state, packNameSearch: action.packNameSearch}
        case 'packs/SET-CURRENT-PAGE':
            // debugger
            return {...state, currentPage: action.currentPage}

        default:
            return state
    }
}
// actions

export const setPacksAC = (packsData: PacksGetResponseDataType) =>
    ({type: 'packs/SET-PACKS', packsData} as const)
export const setMinMaxValueAC = (min: number, max: number) =>
    ({type: "packs/SET-MIN-MAX-VALUE", min, max} as const)
export const setPackNameForSearchAC = (packNameSearch:string) =>
    ({type: "packs/SET-PACK-NAME-FOR-SEARCH", packNameSearch} as const)
export const setMyPacksAC = (user_id:string) =>
    ({type: "packs/SET-MY-PACKS", user_id} as const)
export const createNewPackAC = (newPack: CreatePackRequestType) =>
    ({type: 'packs/CREATE-PACK', newPack} as const)
export const setCurrentPageAC = (currentPage:number) =>
    ({type: 'packs/SET-CURRENT-PAGE',currentPage} as const)



// thunks

export const setPacksTC = (packsData: PacksGetRequestDataType): AppThunk => (dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    packsAPI.setPacks(packsData)
        .then((res) => {
            dispatch(setPacksAC(res.data))
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
export const createPacksTC = (newPack: CreatePackRequestType): AppThunk => (dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    packsAPI.createPack(newPack)
        .then((res) => {
            dispatch(createNewPackAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deletePackTC = (id:string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(setPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updatePackTC = (cardsPack: CardPacksType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(cardsPack)
        .then(() => {
            dispatch(setPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



// types
export type PacksActionsType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof createNewPackAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setPackNameForSearchAC>
    | ReturnType<typeof setMyPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | AuthActionsType






