import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {
    authAPI,
    UserDataResponseType
} from "../../../api/cards-login-api";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {AppThunk} from "../../../api/store";
import {setIsLoggedInAC} from "../registration/auth-reducer";
import {setSuccess} from "../Login/login-reducer";

const initialState = {
    user: {
        _id: '',
        rememberMe: true,
    } as UserDataResponseType,
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-USER':
            return {...state, user: action.user}
        default:
            return state
    }
}
// actions
export const setUserAC = (user: UserDataResponseType) =>
    ({type: 'profile/SET-USER', user,} as const)

// thunks
export const updateUserTC = (user: UserDataResponseType): AppThunk => (dispatch) => {

    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('loading'))
    authAPI.updateUser(user.name)
        .then((res) => {
         console.log(res)
            dispatch(setUserAC(res.data.updatedUser))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setSuccess(false)) ///???????
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type ProfileActionsType =
    | ReturnType<typeof setUserAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
type InitialStateType = typeof initialState

