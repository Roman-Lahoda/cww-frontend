import { IState } from '../../interface/interface-state'

export const getCards = (state: IState) => state.cards.cards
export const getIsLoadingCards = (state: IState) => state.cards.isLoading
export const getErrorCards = (state: IState) => state.cards.error