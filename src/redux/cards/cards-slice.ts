import { createSlice } from '@reduxjs/toolkit';
import { createCard, updateCard, deleteCard, listCard } from './cards-operation'
import { ICards } from '../../interface/interface-cards'

interface ICardState {
    cards: ICards[],
    isLoading: boolean,
    error: null | any
}

const initialState = {
    cards: [],
    isLoading: false,
    error: null
} as ICardState

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCard.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = [...state.cards, action.payload.cardData]
            })
            .addCase(createCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(updateCard.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = state.cards.map(card => {
                    if (card._id === action.payload.cardData._id) {
                        return action.payload.cardData
                    } return card
                })
            })
            .addCase(updateCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(deleteCard.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                console.log(action.payload.cardData)
                state.isLoading = false;
                state.cards = state.cards.filter(card =>
                    card._id !== action.payload.cardData._id
                )
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(listCard.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(listCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = [...action.payload.cardData]
            })
            .addCase(listCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export default cardsSlice.reducer