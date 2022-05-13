import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface ICardsCreate {
    word: string,
    translation: string,
    description: string,
    set: string,
    synonyms: string,
}

export interface ICardsFull {
    _id: string,
    word: string,
    translation: string,
    description: string,
    set: string,
    synonyms: string,
    createdAt: string,
    updatedAt: string
    owner: string
}



export interface IData {
    code: number,
    status: string,
    cardData:
    {
        word: string,
        translation: string,
        description: string,
        set: string,
        synonyms: string,
        owner: string
        _id: string,
        createdAt: string,
        updatedAt: string
    }
}

export interface IDataList {
    code: number,
    status: string,
    cardData: ICardsFull[]
}

const checkIsUserLogin = (err: any) => {
    if (err.message.includes('Request failed with status code 401')) {
        console.log('test11')
        localStorage.removeItem('persist:token')
        alert('Please enter again')
        window.location.reload()
    }
}


const createCard = createAsyncThunk(
    'cards/add',
    async (cardData: ICardsCreate, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('cards/create', cardData)
            const result: IData = data
            toast.success('Successful create', {
                autoClose: 1000,
            });
            return result;
        } catch (err: any) {
            checkIsUserLogin(err)
            toast.error('An error occurred, please try again later', {
                autoClose: 5000,
            });
            return rejectWithValue({ err: err.message });
        }
    }
)

const updateCard = createAsyncThunk(
    'cards/update',
    async (cardData: ICardsFull, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`cards/update/${cardData._id}`, cardData)
            const result: IData = data
            toast.success('Successful update', {
                autoClose: 1000,
            });
            console.log("🚀 ~ file: cards-operation.ts ~ line 102 ~ result", result)
            return result;
        } catch (err: any) {
            checkIsUserLogin(err)
            toast.error('An error occurred, please try again later', {
                autoClose: 5000,
            });
            return rejectWithValue({ err: err.message });
        }
    }
)

const deleteCard = createAsyncThunk(
    'cards/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`cards/delete/${id}`)
            const result: IData = data
            toast.success('Successful delete', {
                autoClose: 1000,
            });
            return result;
        } catch (err: any) {
            checkIsUserLogin(err)
            toast.error('An error occurred, please try again later', {
                autoClose: 5000,
            });
            return rejectWithValue({ err: err.message });
        }
    }
)

const listCard = createAsyncThunk(
    'cards/list',
    async (set: string | undefined, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`cards/list${set ? `?set=${set}` : ''}`)
            const result: IDataList = data
            return result;
        } catch (err: any) {
            console.log(err)
            checkIsUserLogin(err)
            toast.error('An error occurred, please try again later', {
                autoClose: 5000,
            });
            return rejectWithValue({ err: err.message });
        }
    }
)

export { createCard, updateCard, deleteCard, listCard }