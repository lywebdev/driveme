import {createStore} from "./createStore.js";
import {immer} from "zustand/middleware/immer";
import AuthService from "../services/AuthService.js";
import {API_URL} from '@config/http.js';
import {setSession} from "../auth/auth.utlis.js";
import axios from "axios";

const initialAuthState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined,
    backendErrors: [],
};


export const useUserStore = createStore(
    immer((set) => ({
        ...initialAuthState,

        setErrors: errors => set({
            errors: errors,
        }),

        setIsAuthenticated: isAuthenticated => set({
            isAuthenticated: isAuthenticated,
        }),
        setIsAuthLoading: isAuthLoading => set({
            isAuthLoading: isAuthLoading,
        }),
        setUser: user => set({
            user: user,
        }),

        login: async (email, password) => {
            try {
                const response = (await AuthService.login(email, password)).data;

                setSession(response.data.accessToken);

                set({
                    isAuthenticated: true,
                    user: response.data.user,
                });
            } catch (e) {
                set({
                    backendErrors: e.response.data.errors
                });
            }
        },
        refreshTokens: async () => {
            try {
                const response = await AuthService.refresh();
                const {accessToken, user} = response.data.content.data;

                setSession(accessToken);

                set({
                    isAuthenticated: true,
                    user: user,
                });
            } catch (e) {
                set({
                    isAuthenticated: false,
                    user: undefined,
                });
            }
        },
        logout: async () => {
            setSession(null);

            set({
                isAuthenticated: false,
                user: undefined,
            });
        },

        checkAuth: async () => {
            try {
                const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
                localStorage.setItem('token', response.data.accessToken);

                set({
                    isAuthenticated: true,
                    user: response.data.user,
                });
            } catch (e) {
                console.log(e);
            }
        }
    })), 'UserStore'
);