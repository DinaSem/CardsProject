import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {
    authAPI,
    LoginParamsType,
    RegisterParamsType,
    UserDataResponseType
} from "../dal/cards-login-api";
import { handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";
import {setUserAC} from "./profile-reducer";


const initialState = {
    loading: false,
    success: false,
    error: '',
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-SERVER-ERROR': {
            return { error: action.error, loading: false, success: false }
        }
        case 'login/SET-LOADING': {
            return { error: '', loading: action.loading, success: false }
        }
        case 'login/SET-SUCCESS': {
            return { error: '', loading: false, success: action.success }
        }
        default:
            return state
    }
}
// actions

export const setIsLoading = (loading: boolean) =>
    ({ type: 'login/SET-LOADING', loading } as const)
export const setServerErrorAC = (error: string) =>
    ({ type: 'login/SET-SERVER-ERROR', error } as const)
export const setSuccess = (success: boolean) =>
    ({ type: 'login/SET-SUCCESS', success } as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppErrorAC(null))
    authAPI.login(data)
        .then((res)=>{
    dispatch(setAppStatusAC('succeeded'))
    dispatch(setIsLoggedInAC(true))
    dispatch(setUserAC(res.data))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type LoginActionsType =
    | ReturnType<typeof setServerErrorAC>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setSuccess>
    | SetAppStatusActionType
    | SetAppErrorActionType
type InitialStateType = typeof initialState

