import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {authAPI, RegisterParamsType,} from "../dal/cards-login-api";
import { handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    serverError:'',
}
type InitialStateType = {
    isLoggedIn: boolean
    isRegistered: boolean
    serverError:string
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "auth/SET-IS-REGISTERED-IN":
            return {...state, isRegistered: action.value}
        case 'auth/SET-SERVER-ERROR':
            return { ...state, serverError: action.error }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'auth/SET-IS-LOGGED-IN', value} as const)
export const setIsRegisteredAC = (value: boolean) =>
    ({type: 'auth/SET-IS-REGISTERED-IN', value} as const)
export const setServerErrorAC = (error: string) =>
    ({ type: 'auth/SET-SERVER-ERROR', error } as const)



// thunks
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppErrorAC(null))
    authAPI.register(data)
        .then(() => {
        dispatch(setIsRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setServerErrorAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

