import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {
    authAPI,
    LoginParamsType,
    RegisterParamsType,
    UserDataResponseType
} from "../dal/cards-login-api";
import { handleServerNetworkError} from "../utils/error-utils";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    user: null,
    name: '',
    email:'',
    password:'',
    sent:false
}
type InitialStateType = {
    user: UserDataResponseType | null,
    isLoggedIn: boolean
    isRegistered: boolean
    name: string
    email: string
    password: string
    sent:boolean
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, user: action.payload, isLoggedIn: true}
        case "login/SET-IS-REGISTRATED-IN":
            return {...state, isRegistered: action.value}
        case "login/SET-IS-LOGGED-OUT":
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        case "login/UPDATE-USER":
            return {...state, name: action.name}
        case "login/SET-EMAIL":
            return {...state, email:action.email}
        case "login/EMAIL-HAS-BEEN-SENT":
            return {...state, sent:action.sent}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (payload: UserDataResponseType) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload} as const)
export const setIsRegisteredAC = (value: boolean) =>
    ({type: 'login/SET-IS-REGISTRATED-IN', value} as const)
export const setIsLoggedOutAC = () =>
    ({type: 'login/SET-IS-LOGGED-OUT'} as const)
export const updateUsertAC = (name: string) =>
    ({type: 'login/UPDATE-USER', name} as const)
export const setEmailAC = (email: string) =>
    ({type: 'login/SET-EMAIL', email} as const)
export const setNewPasswordAC = (password: string) =>
    ({type: 'login/SET-NEW-PASSWORD', password} as const)
export const emailHasBeenSent = (sent: boolean) =>
    ({type: 'login/EMAIL-HAS-BEEN-SENT', sent} as const)


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
    authAPI.logout()
        .then(() => {
        dispatch(setIsLoggedOutAC())
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then(() => {
        dispatch(setIsRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((res) => {
            if (res.data._id) {
                dispatch(setIsLoggedInAC(res.data));
                dispatch(setAppStatusAC('succeeded'))
            }
            console.log('me', res.data)
        })
}
export const updateUserTC = (name: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.updateUser(name)
        .then(() => {
            dispatch(updateUsertAC(name));
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const forgotPasswordTC = (email:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.forgotPassword(email)
        .then(() => {
            debugger
            dispatch(setEmailAC(email))
            dispatch(emailHasBeenSent(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const setNewPasswordTC = (password:string,resetPasswordToken: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.newPassword(password,resetPasswordToken)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}


// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setIsLoggedOutAC>
    | ReturnType<typeof updateUsertAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setNewPasswordAC>
    | ReturnType<typeof emailHasBeenSent>
    | SetAppStatusActionType
    | SetAppErrorActionType

