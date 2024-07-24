import axios from "axios";
import {getSession, setSession} from "../auth/auth.utlis.js";
import {routes} from "@config/routes.js";
import AuthService from "../services/AuthService.js";

export const API_URL = import.meta.env.API_URL || 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getSession()}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.refresh();
            const {accessToken} = response.data.content.data;

            setSession(accessToken);

            return $api.request(originalRequest);
        } catch (e) {
            return location.href=routes.login;
        }
    }
    throw error;
});


export default $api;