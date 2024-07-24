import axios from "axios";

export const API_URL = import.meta.env.API_URL || 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

export default $api;