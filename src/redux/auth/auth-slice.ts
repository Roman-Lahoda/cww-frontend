import { createSlice } from '@reduxjs/toolkit';
import { signup, login, logout, googleLogin } from './auth-operation';

interface IAuthState {
    token: null | string,
    isLoading: boolean,
    error: null | any
}

const initialState = {
    token: null,
    isLoading: false,
    error: null
} as IAuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.userData.token ? action.payload.userData.token : null;
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = null;
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(googleLogin, (state, action) => {
                state.token = action.payload
            })
    }
})

export default authSlice.reducer;