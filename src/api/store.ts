import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from '../features/app/app-reducer'
import {AuthActionsType, authReducer} from "../features/auth/registration/auth-reducer";
import {PacksActionsType, packsReducer} from "../features/packs/packs-reducer";
import {LoginActionsType, loginReducer} from "../features/auth/Login/login-reducer";
import {ProfileActionsType, profileReducer} from "../features/auth/profile/profile-reducer";
import {passwordRecoveryReducer, PasswordRecoveryType} from "../features/auth/recovery/passwordRecovery-reducer";
import {CardsActionsType, cardsReducer} from "../features/cards/cards-reducer";

export type AppStoreType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    login:loginReducer,
    profile:profileReducer,
    recovery:passwordRecoveryReducer,
    cards:cardsReducer

})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

export type AppActionType =
    | AuthActionsType
    | AppActionsType
    | LoginActionsType
    | ProfileActionsType
    | PasswordRecoveryType
    | PacksActionsType
    | CardsActionsType

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
