import useAuth from "../hooks/contexts/useAuth.js";
import {Navigate} from "react-router-dom";
import AdminLayout from "@components/admin/layouts/AdminLayout.jsx";
import config from "@config/app.js";
import {USER_ROLES} from "../../utils/constants.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";

const AuthGuard = () => {
    const { appIsLoading, isAuthenticated, user } = useAuth();

    if (appIsLoading) {
        return <AppLoadingOverlay loaderVisible={appIsLoading} />;
    }

    if (!isAuthenticated || user.role !== USER_ROLES.admin) {
        return <Navigate to={config.PATH_UNAUTHORIZED} />;
    }

    return <AdminLayout />;
};


export default AuthGuard;