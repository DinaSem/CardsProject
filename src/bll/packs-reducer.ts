import {Dispatch} from 'redux'
import {setAppStatusAC} from './app-reducer'
import {handleServerNetworkError} from "../utils/error-utils";
import {
    CreatePackRequestType,
    packsAPI,
    PacksGetRequestDataType,
    PacksGetRequestType,
    PacksGetResponseDataType
} from "../dal/cards-api";
import {AppThunk} from "./store";
import {AuthActionsType, setIsLoggedInAC} from "./auth-reducer";


const initialState = {
    packsData: {},
    myPacksMode: false,
    newPack: {
        cardsPack: {
            name: "Dina's ",
            deckCover: "",// не обязателен
            private: false,// если не отправить будет такой
        }
    }


} as PacksStateType

type PacksStateType = {
    packsData: PacksGetResponseDataType
    //myPacksId:string
    myPacksMode: boolean
    newPack: CreatePackRequestType
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, packsData: action.packsData}
        case "packs/SET-MY-PACKS":
            return {...state, myPacksMode: action.myPacksMode}
        case "packs/SET-MIN-MAX-VALUE":
            return {
                ...state,
                packsData: {
                    ...state.packsData,
                    minCardsCount: action.min,
                    maxCardsCount: action.max
                }
            }
        case "packs/CREATE-PACK":
            return {...state, newPack: action.newPack}
        default:
            return state
    }
}
// actions

export const setPacksAC = (packsData: PacksGetResponseDataType) =>
    ({type: 'packs/SET-PACKS', packsData} as const)
export const setMyPacksAC = (myPacksMode: boolean) =>
    ({type: 'packs/SET-MY-PACKS', myPacksMode} as const)
export const setMinMaxValueAC = (min: number, max: number) =>
    ({type: "packs/SET-MIN-MAX-VALUE", min, max} as const)
export const createNewPackAC = (newPack: CreatePackRequestType) =>
    ({type: 'packs/CREATE-PACK', newPack} as const)
// export const setIsRegisteredAC = (value: boolean) =>
//     ({type: 'login/SET-IS-REGISTRATED-IN', value} as const)
// export const setIsLoggedOutAC = () =>
//     ({type: 'login/SET-IS-LOGGED-OUT'} as const)
// export const updateUsertAC = (name: string) =>
//     ({type: 'login/UPDATE-USER', name} as const)
// export const setEmailAC = (email: string) =>
//     ({type: 'login/SET-EMAIL', email} as const)
// export const setNewPasswordAC = (password: string) =>
//     ({type: 'login/SET-NEW-PASSWORD', password} as const)
// export const emailHasBeenSent = (sent: boolean) =>
//     ({type: 'login/EMAIL-HAS-BEEN-SENT', sent} as const)


// thunks

// export const setPacksTC = (packsRequest: PacksGetRequestDataType): AppThunk => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
export const setPacksTC = (packsRequest: PacksGetRequestDataType): AppThunk => (dispatch, getState) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    packsAPI.setPacks({
        packName: packsRequest.packName,
        min: getState().packs.packsData.minCardsCount,
        max: getState().packs.packsData.maxCardsCount,
        sortPacks: packsRequest?.sortPacks,
        page: getState().packs.packsData.page,
        pageCount: packsRequest.pageCount,
        user_id: packsRequest?.user_id,
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
            console.log(res.data)
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
    | ReturnType<typeof setMyPacksAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof createNewPackAC>
    | ReturnType<typeof setIsLoggedInAC>
    | AuthActionsType






