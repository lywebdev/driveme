import { useState } from 'react';
import Header from "@layouts/Header.jsx";
import Footer from "@layouts/Footer.jsx";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";
import Popup from "@components/UI/Popup/Popup.jsx";
import CookieComponent from "@components/CookieComponent/CookieComponent.jsx";

const Layout = () => {
    const { appIsLoading } = useAuth();
    const [showPopup, setShowPopup] = useState(true);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <>
            <AppLoadingOverlay loaderVisible={appIsLoading} />
            {!appIsLoading && (
                <>
                    <Header />
                    <div id="body">
                        <Outlet />
                        {showPopup && (
                            <Popup
                                onClose={handleClose}
                                hideTo="bottom"
                                showFrom="bottom"
                                type="info"
                            >
                                <CookieComponent onClose={handleClose} />
                            </Popup>
                        )}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Layout;
