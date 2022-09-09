import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer'
import {AuthActionsType, authReducer} from "./auth-reducer";
import {PacksActionsType, packsReducer} from "./packs-reducer";

export type AppStoreType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

export type AppActionType = PacksActionsType
    | AuthActionsType
    | AppActionsType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
