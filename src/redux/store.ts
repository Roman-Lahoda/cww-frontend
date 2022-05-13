import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { useDispatch } from 'react-redux'
import authReducer from "./auth/auth-slice"
import cardsReducer from './cards/cards-slice'

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        // serializableCheck: false,
    })
];

const authPersistConfig = {
    key: 'token',
    storage,
    whitelist: ['token'],
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        cards: cardsReducer
    },
    devTools: process.env.NODE_ENV === 'development',
    // middleware,
});
const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export default { store, persistor };