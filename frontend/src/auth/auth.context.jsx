import {createContext, useCallback, useEffect} from "react";
import {useUserStore} from "@store/useUserStore.js";
import {getSession} from "./auth.utlis.js";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [refreshTokens, logout] = useUserStore(state => [
        state.refreshTokens,
        state.logout,
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
            logout();
        }
    }, [refreshTokens, logout]);


    useEffect(() => {
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successful'))
            .catch((error) => console.log(error));
    }, [initializeAuthContext]);





    const [isAuthenticated] = useUserStore(state => [
        state.isAuthenticated,
    ]);

    const valueObjects = {
        isAuthenticated: isAuthenticated,
    };

    return <AuthContext.Provider value={valueObjects}>{children}</AuthContext.Provider>;
};


export default AuthContextProvider;