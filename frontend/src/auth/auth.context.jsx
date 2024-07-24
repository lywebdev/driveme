import {createContext, useCallback, useEffect} from "react";
import {useUserStore} from "@store/useUserStore.js";
import {getSession} from "./auth.utlis.js";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [refreshTokens, logout, isAuthenticated] = useUserStore(state => [
        state.refreshTokens,
        state.logout,
        state.isAuthenticated
    ]);

    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if (token) {
                // validate accessToken by calling backend
                refreshTokens();
            } else {
                logout();
            }
        } catch (error) {
            console.log('Обработка ошибка при рефреш токенах или логауте', error);
            logout();
        }
    }, [refreshTokens, logout]);


    useEffect(() => {
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successful'))
            .catch((error) => console.log(error));
    }, [initializeAuthContext]);


    const valueObjects = {
        isAuthenticated: isAuthenticated,
    };

    return <AuthContext.Provider value={valueObjects}>{children}</AuthContext.Provider>;
};


export default AuthContextProvider;