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
    forgotPasswordData: {
        email: "", // кому восстанавливать пароль
        from: "test-front-admin <d.r.semenovaa@yandex.ru>",
        message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>` // хтмп-письмо, вместо $token$ бэк вставит токен
    }
}
type InitialStateType = {
    user: UserDataResponseType | null,
    isLoggedIn: boolean
    isRegistered: boolean
    name: string
    forgotPasswordData: ForgotPasswordParamsType
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
        case "login/FORGOT-PASSWORD":
            return {...state, forgotPasswordData:{...state.forgotPasswordData, email:action.email}}
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
export const forgotPasswordtAC = (email: string) =>
    ({type: 'login/FORGOT-PASSWORD', email} as const)


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
export const forgotPasswordTC = (email:string) => (dispatch: Dispatch,getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    // debugger
    authAPI.forgotPassword(email)
        .then((res) => {
            debugger
            dispatch(forgotPasswordtAC(email));
            dispatch(setAppStatusAC('succeeded'))
        })
}

// export const searchMoviesTC = (query_term: string) => {
//     return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {
//         dispatch(setAppStatusAC('loading'))
//         let {genre,page} = getState().movies;
//         // const {query_term} = params
//         movieAPI.getMovie({query_term, genre,page})
//             .then((res) => {
//                 dispatch(setMovieAC(res.movies,res.movie_count))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setIsLoggedOutAC>
    | ReturnType<typeof updateUsertAC>
    | ReturnType<typeof forgotPasswordtAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

