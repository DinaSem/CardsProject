import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {handleServerNetworkError} from "../utils/error-utils";
import {packsAPI, PacksGetRequestDataType, PacksGetRequestType, PacksGetResponseDataType} from "../dal/cards-api";
import {AppRootStateType, AppThunk} from "./store";


const initialState = {
    packsData: {}

} as PacksStateType

type PacksStateType = {
    packsData: PacksGetResponseDataType

}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, packsData: action.packsData}
        // case 'login/SET-IS-LOGGED-IN':
        //     return {...state, user: action.payload, isLoggedIn: true}
        // case "login/SET-IS-REGISTRATED-IN":
        //     return {...state, isRegistered: action.value}
        // case "login/SET-IS-LOGGED-OUT":
        //     return {
        //         ...state,
        //         user: null,
        //         isLoggedIn: false
        //     }
        // case "login/UPDATE-USER":
        //     return {...state, name: action.name}
        // case "login/SET-EMAIL":
        //     return {...state, email:action.email}
        // case "login/EMAIL-HAS-BEEN-SENT":
        //     return {...state, sent:action.sent}
        default:
            return state
    }
}
// actions

export const setPacksAC = (packsData: PacksGetResponseDataType) =>
    ({type: 'packs/SET-PACKS', packsData} as const)
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

export const setPacksTC = (packsRequest: PacksGetRequestDataType): AppThunk => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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





