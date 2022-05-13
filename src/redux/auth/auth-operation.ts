import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { handleToken } from '../../service/service'
import { IUser, IData } from '../../interface/interface-user'

const signup = createAsyncThunk(
    'user/signup',
    async (userData: IUser, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/user/signup', userData);
            const result: IData = data
            toast.success('Sign up successful');
            return result;
        } catch (err: any) {
            toast.error('An error occurred, please try again or use a different mailbox', {
                autoClose: 5000,
            });
            return rejectWithValue({ error: err.message });
        }
    }
);

const login = createAsyncThunk(
    'users/login',
    async (userData: IUser, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/user/login', userData);
            const result: IData = data
            toast.success('Welcome');
            handleToken.set(result.userData.token ? result.userData.token : '');
            return result;
        } catch (err: any) {
            toast.error('An error occurred, please try again later', {
                autoClose: 5000,
            });
            return rejectWithValue({ err: err.message });
        }
    });

const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post('/user/logout');
        handleToken.unset();
    } catch (err: any) {
        toast.error('An error occurred, please try again later', {
            autoClose: 5000,
        });
        return rejectWithValue({ err: err.message });
    }
});

const googleLogin = createAction('googleLogin', (token: string) => ({ payload: token }))

export { signup, login, logout, googleLogin }