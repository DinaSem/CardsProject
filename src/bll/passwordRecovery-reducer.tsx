import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {authAPI} from "../dal/cards-login-api";
import { handleServerNetworkError} from "../utils/error-utils";
import {AppThunk} from "./store";

const initialState = {
    recoveryEmail: '',
    sent:false
}
// const initialState = {
//     isLoggedIn: false,
//     serverError:'',
//     user: null,
//     name: '',
//     email:'',
//     password:'',
//     sent:false
// }
// type InitialStateType = {
//     user: UserDataResponseType | null,
//     isLoggedIn: boolean
//     serverError:string
//     name: string
//     email: string
//     password: string
//     sent:boolean
// }

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryType): InitialStateType => {
    switch (action.type) {
        case 'recovery/SET-RECOVERY-EMAIL':
            return { ...state, recoveryEmail: action.email }
        // case 'auth/SET-SERVER-ERROR':
        //     return { ...state, serverError: action.error }
        // case "login/SET-EMAIL":
        //     return {...state, email:action.email}
        case "login/EMAIL-HAS-BEEN-SENT":
            return {...state, sent:action.sent}
        default:
            return state
    }
}
// actions
export const setRecoveryEmailAC = (email: string) =>
    ({ type: 'recovery/SET-RECOVERY-EMAIL', email } as const)
// export const setServerErrorAC = (error: string) =>
//     ({ type: 'auth/SET-SERVER-ERROR', error } as const)
// export const setEmailAC = (email: string) =>
//     ({type: 'login/SET-EMAIL', email} as const)
// export const setNewPasswordAC = (password: string) =>
//     ({type: 'login/SET-NEW-PASSWORD', password} as const)
export const emailHasBeenSentAC = (sent: boolean) =>
    ({type: 'login/EMAIL-HAS-BEEN-SENT', sent} as const)


// thunks

export const passwordRecoveryTC =
    (email: string): AppThunk => (dispatch) => {
                dispatch(setAppErrorAC(null))
                dispatch(setAppStatusAC('loading'))
                dispatch(setRecoveryEmailAC(email))
                authAPI.forgotPassword(email)
                    .then(()=>{
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(emailHasBeenSentAC(true))
                    })
                    .catch((error) => {
                        handleServerNetworkError(error, dispatch)
                    })
    }

export const setNewPasswordTC =
    (password: string, resetPasswordToken: string): AppThunk => (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        authAPI.newPassword(password, resetPasswordToken)
            .then(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
// types
export type PasswordRecoveryType =
    // | ReturnType<typeof setServerErrorAC>
    | ReturnType<typeof setRecoveryEmailAC>
    // | ReturnType<typeof setEmailAC>
    // | ReturnType<typeof setNewPasswordAC>
    | ReturnType<typeof emailHasBeenSentAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
type InitialStateType = typeof initialState
