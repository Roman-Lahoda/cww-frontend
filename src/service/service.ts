import axios from 'axios'
axios.defaults.baseURL = 'https://cww-lari.herokuapp.com';

export const handleToken = {
    set(token: string) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};