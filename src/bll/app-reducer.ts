import {AppThunk} from "./store";
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../dal/cards-login-api";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized:boolean
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED-IN":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}


export const setAppInitializedAC = (value: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED-IN', value} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        const res = await authAPI.me()
        dispatch(setIsLoggedInAC(true))
        //dispatch(setUserAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionsType =
    | ReturnType<typeof setAppInitializedAC >
    | SetAppErrorActionType
    | SetAppStatusActionType
