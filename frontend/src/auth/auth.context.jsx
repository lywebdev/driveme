import {createContext, useCallback, useEffect, useState} from "react";
import {useUserStore} from "@store/useUserStore.js";
import useConsent from "../hooks/useConsent.js";
import {getSession, setSession} from "./auth.utlis.js";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTokens, logout, isAuthenticated, setIsAuthenticated, setUser] = useUserStore(state => [
        state.refreshTokens,
        state.logout,
        state.isAuthenticated,
        state.setIsAuthenticated,
        state.setUser,
    ]);
    const [cookieConsentFlag, setCookieConsentFlag] = useConsent();


    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if (token) {
                // validate accessToken by calling backend
                await refreshTokens();
            } else {
                setSession(null);

                setIsAuthenticated(false);
                setUser(undefined);
            }
        } catch (error) {
            await logout();
        }

        setIsLoading(false);
    }, [refreshTokens, logout]);


    useEffect(() => {
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successful'))
            .catch((error) => console.log(error));
    }, [initializeAuthContext]);


    const valueObjects = {
        isAuthenticated: isAuthenticated,
        appIsLoading: isLoading,
        cookieConsentFlag,
        setCookieConsentFlag,
    };


    return <AuthContext.Provider value={valueObjects}>{children}</AuthContext.Provider>;
};


export default AuthContextProvider;