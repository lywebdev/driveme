import {NavLink, Outlet} from "react-router-dom";
import useAuth from "../../../hooks/contexts/useAuth.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";

const AdminLayout = () => {
    const { appIsLoading } = useAuth();

    return <>
        <AppLoadingOverlay loaderVisible={appIsLoading} />
        {!appIsLoading && (
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Dashboard</NavLink></li>
                    <li><NavLink to={'/'}>Users</NavLink></li>
                    <li><NavLink to={'/'}>Settings</NavLink></li>
                </ul>
            </nav>
        )}

        <Outlet/>
    </>;
};

export default AdminLayout;