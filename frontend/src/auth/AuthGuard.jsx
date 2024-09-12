import useAuth from "../hooks/contexts/useAuth.js";
import {Navigate} from "react-router-dom";
import config from "@config/app.js";
import Layout from "@layouts/Layout.jsx";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";

const AuthGuard = () => {
    const { appIsLoading, isAuthenticated } = useAuth();

    if (appIsLoading) {
        return <AppLoadingOverlay loaderVisible={appIsLoading} />;
    }

    if (!isAuthenticated) {
        return <Navigate to={config.PATH_UNAUTHORIZED} />;
    }

    return <Layout />;
};


export default AuthGuard;