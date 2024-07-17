import useAuth from "../hooks/useAuth.js";
import {Navigate} from "react-router-dom";
import AdminLayout from "@components/admin/layouts/AdminLayout.jsx";
import config from "@config/app.js";

const AuthGuard = () => {
    // const {isAuthenticated, user, isAuthLoading} = useAuth();
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={config.PATH_UNAUTHORIZED} />;
    }

    return <AdminLayout />;
};


export default AuthGuard;