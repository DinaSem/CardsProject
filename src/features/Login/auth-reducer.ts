import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {
    authAPI, ForgotPasswordParamsType,
    LoginParamsType,
    RegisterParamsType, UpdateUserParamsType,
    UpdateUserResponseType,
    UserDataResponseType
} from "../../api/cards-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppRootStateType} from "../../app/store";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    user: null,
    name: '',
    email:'',
    password:''
}
type InitialStateType = {
    user: UserDataResponseType | null,
    isLoggedIn: boolean
    isRegistered: boolean
    name: string
    email: string
    password: string
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
        dispatch(setIsLoggedOutAC())
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
        .then((res) => {
            dispatch(updateUsertAC(name));
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const forgotPasswordTC = (email:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.forgotPassword(email)
        .then((res) => {
            debugger
            dispatch(setEmailAC(email));
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const setNewPasswordTC = (password:string,resetPasswordToken: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.newPassword(password,resetPasswordToken)
        .then((res) => {
            debugger
            dispatch(setAppStatusAC('succeeded'))
        })
}


// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setIsLoggedOutAC>
    | ReturnType<typeof updateUsertAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setNewPasswordAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

