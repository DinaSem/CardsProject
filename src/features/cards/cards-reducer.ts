import {setAppStatusAC} from '../app/app-reducer'
import {handleServerNetworkError} from "../../utils/error-utils";
import {cardsAPI, CardsGetRequestDataType, CardsStateType, CardType, CreateCardRequestType,} from "../../api/cards-api";
import {AppThunk} from "../../api/store";
import {AuthActionsType} from "../auth/registration/auth-reducer";


const initialState = {
    cards: [] as CardsStateType,
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 5,
    sortCards: '0updated',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    currentPage: 1,
    cardNameSearch:'',
    newCard: {
        card: {
            cardsPack_id: "",
            question: 'нужно что-то спросить?',
            answer: "какой-то ответ",
            grade: 2,
        }
    },

}


export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, cards: action.cards}
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "cards/SET-PAGE":
            return {...state, page: action.page}
        case "cards/CREATE-NEW-CARD":
            return <InitialStateType>{...state, newCard: action.newCard}
        case "cards/SORT-CARDS":
            return {...state, sortCards: action.sortCards}
        case "cards/SET-CARD-NAME-FOR-SEARCH":
            return {...state, cardNameSearch: action.cardNameSearch}

        default:
            return state
    }
}
// actions

export const setCardsAC = (cards: CardsStateType) =>
    ({type: 'cards/SET-CARDS', cards} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) =>
    ({type: 'cards/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)
export const setCardPageAC = (page:number) =>
    ({type: 'cards/SET-PAGE',page} as const)
export const createNewCardAC = (newCard:CreateCardRequestType) =>
    ({type: 'cards/CREATE-NEW-CARD',newCard} as const)
export const sortCardsAC = (sortCards:string) =>
    ({type: 'cards/SORT-CARDS',sortCards} as const)
export const setCardNameForSearchAC = (cardNameSearch:string) =>
    ({type: "cards/SET-CARD-NAME-FOR-SEARCH", cardNameSearch} as const)



// thunks

export const setCardsTC = (cardsPack_id: string): AppThunk => (dispatch, getState) => {
    const { cardAnswer,
    cardQuestion,
    min,
    max,
    sortCards,
    page,
    pageCount} = getState().cards
    const cardsData: CardsGetRequestDataType = {
        cardAnswer,
        cardQuestion,
        cardsPack_id,
        min,
        max,
        sortCards,
        page,
        pageCount
    }
    dispatch(setAppStatusAC('loading'))
    // cardsAPI.setCards({cardsPack_id})
    cardsAPI.setCards(cardsData)
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
            dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const createCardsTC = (newCard: CreateCardRequestType): AppThunk => (dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    cardsAPI.createCard(newCard)
        .then(() => {
            dispatch(setCardsTC(newCard.card.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deletePackTC = (id:string,cardsPack_id:string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
   cardsAPI.deleteCard(id)
        .then(() => {
            dispatch(setCardsTC(cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateCardTC = (card: CardType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(card)
        .then(() => {
            dispatch(setCardsTC(card.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof setCardPageAC>
    | ReturnType<typeof createNewCardAC>
    | ReturnType<typeof sortCardsAC>
    | ReturnType<typeof setCardNameForSearchAC>
    | AuthActionsType
type InitialStateType = typeof initialState






