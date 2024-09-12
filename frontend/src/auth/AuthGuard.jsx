import useAuth from "../hooks/contexts/useAuth.js";
import {Navigate} from "react-router-dom";
import config from "@config/app.js";
import Layout from "@layouts/Layout.jsx";

const AuthGuard = () => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={config.PATH_UNAUTHORIZED} />;
    }

    return <Layout />;
};


export default AuthGuard;