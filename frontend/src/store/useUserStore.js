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
};


export const useUserStore = createStore(
    immer((set) => ({
        ...initialAuthState,

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
                const response = await AuthService.login(email, password);
                localStorage.setItem('token', response.data.accessToken);

                this.setIsAuthenticated(true);
                this.setUser(response.data.user);

                console.log('success auth');
            } catch (e) {
                console.log(e);
            }
        },
        refreshTokens: async () => {
            const response = await AuthService.refresh();
            const {accessToken, user} = response.content;

            setSession(accessToken);

            set({
                isAuthenticated: true,
                user: user,
            });
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