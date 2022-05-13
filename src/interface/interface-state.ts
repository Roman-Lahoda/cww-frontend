import { ICards } from './interface-cards'

export interface IState {
    auth: {
        token: null | string,
        isLoading: boolean,
        error: null | any
    },
    cards: {
        cards: ICards[],
        isLoading: boolean,
        error: null | any
    },
}
