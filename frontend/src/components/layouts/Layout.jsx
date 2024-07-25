import Header from "@layouts/Header.jsx";
import Footer from "@layouts/Footer.jsx";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";

const Layout = () => {
    const { appIsLoading } = useAuth();

    return (
        <>
            <AppLoadingOverlay loaderVisible={appIsLoading} />
            {!appIsLoading &&
                <>
                    <Header />
                    <div id="body">
                        <Outlet />
                    </div>
                    <Footer />
                </>
            }
        </>
    );
};

export default Layout;