import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_PRESTAMESOFT_API_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});