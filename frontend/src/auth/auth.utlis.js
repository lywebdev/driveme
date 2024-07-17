import $api from "@config/http.js";

export const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        $api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete $api.defaults.headers.common.Authorization;
    }
};

export const getSession = () => {
    return localStorage.getItem('accessToken');
};