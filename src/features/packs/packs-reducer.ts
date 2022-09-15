import {Dispatch} from 'redux'
import {setAppStatusAC} from '../app/app-reducer'
import {handleServerNetworkError} from "../../utils/error-utils";
import {
    CreatePackRequestType,
    packsAPI,
    PacksGetRequestDataType,
    PacksGetResponseDataType
} from "../../api/cards-api";
import {AppThunk} from "../../api/store";
import {AuthActionsType, setIsLoggedInAC} from "../auth/registration/auth-reducer";


const initialState = {
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



} as PacksStateType

type PacksStateType = {
    packsData: PacksGetResponseDataType
    myPacksMode: boolean
    newPack: CreatePackRequestType
    packNameSearch:string
    user_id:string
    min:number
    max:number
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


// thunks

export const setPacksTC = (packsData: PacksGetRequestDataType): AppThunk => (dispatch, getState) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    packsAPI.setPacks({
        packName: getState().packs.packNameSearch,
        min: getState().packs.min,
        max: getState().packs.max,
        sortPacks: packsData?.sortPacks,
        page: getState().packs.packsData.page,
        pageCount: packsData.pageCount,
        user_id: getState().packs.user_id,
    })

        .then((res) => {
            dispatch(setPacksAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createPacksTC = (newPack: CreatePackRequestType): AppThunk => (dispatch: Dispatch) => {
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
// export const logOutTC = () => (dispatch: Dispatch) => {
//     // debugger
//     dispatch(setAppStatusAC('loading'))
//     authAPI.logout()
//         .then(() => {
//         dispatch(setIsLoggedOutAC())
//         dispatch(setAppStatusAC('succeeded'))
//     })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//
// export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.register(data)
//         .then(() => {
//         dispatch(setIsRegisteredAC(true))
//         dispatch(setAppStatusAC('succeeded'))
//     })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.me()
//         .then((res) => {
//             if (res.data._id) {
//                 dispatch(setIsLoggedInAC(res.data));
//                 dispatch(setAppStatusAC('succeeded'))
//             }
//             console.log('me', res.data)
//         })
// }
// export const updateUserTC = (name: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     // debugger
//     authAPI.updateUser(name)
//         .then(() => {
//             dispatch(updateUsertAC(name));
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }
// export const forgotPasswordTC = (email:string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     // debugger
//     authAPI.forgotPassword(email)
//         .then(() => {
//             debugger
//             dispatch(setEmailAC(email))
//             dispatch(emailHasBeenSent(true))
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }
// export const setNewPasswordTC = (password:string,resetPasswordToken: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     // debugger
//     authAPI.newPassword(password,resetPasswordToken)
//         .then(() => {

//             dispatch(setAppStatusAC('succeeded'))
//         })
// }


// types
export type PacksActionsType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof createNewPackAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setPackNameForSearchAC>
    | ReturnType<typeof setMyPacksAC>
    | AuthActionsType






