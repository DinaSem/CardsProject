import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType, RegisterParamsType, UserDataResponseType} from "../../api/cards-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    user: null
}
type InitialStateType = {
    user: UserDataResponseType | null,
    isLoggedIn: boolean
    isRegistered: boolean
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, user: action.payload, isLoggedIn: true}
        case "login/SET-IS-REGISTRATED-IN":
            return {...state, isRegistered:action.value}
        case "login/SET-IS-LOGGED-OUT":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (payload: UserDataResponseType) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload} as const)
export const setIsRegisteredAC = (value: boolean) =>
    ({type: 'login/SET-IS-REGISTRATED-IN', value} as const)
export const setIsLoggedOutAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-OUT', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then((res) => {
        dispatch(setIsLoggedInAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then((res) => {
            dispatch(setIsLoggedOutAC(false))
            dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data).then((res) => {
        dispatch(setIsRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
                dispatch(setIsLoggedInAC(res.data));
        })
}


// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setIsLoggedOutAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

