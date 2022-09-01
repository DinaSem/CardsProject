import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "login/SET-IS-INITIALIZED--IN":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED--IN', value} as const)

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     debugger
//     dispatch(setAppStatusAC('loading'))
//     authAPI.me().then(res => {
//         debugger
//         if (res.data.resultCode === 0) {
//             dispatch(setIsInitializedAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch);
//         }
//     })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
//         .finally(()=>{
//             dispatch(setIsInitializedAC(true))
//         })
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized:boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | ReturnType<typeof setIsInitializedAC>
    | SetAppErrorActionType
    | SetAppStatusActionType
