import Header from "@layouts/Header.jsx";
import Footer from "@layouts/Footer.jsx";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/contexts/useAuth.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";
import Popup from "@components/UI/Popup/Popup.jsx";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Layout = () => {
    const { appIsLoading, cookieConsentFlag, setCookieConsentFlag } = useAuth();

    const handleConsent = () => {
        setCookieConsentFlag();
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>DriveMe</title>
                </Helmet>
                <AppLoadingOverlay loaderVisible={appIsLoading} />
                {!appIsLoading && (
                    <>
                        <Header />
                        <div id="body">
                            <Outlet />
                            {!cookieConsentFlag && (
                                <Popup
                                    onClose={handleConsent}
                                    hideTo="bottom"
                                    showFrom="bottom"
                                    type="info"
                                    text="We use cookies to enhance your experience. Do you accept our cookie policy?"
                                    buttonText="I Accept"
                                />
                            )}
                        </div>
                        <Footer />
                    </>
                )}
            </HelmetProvider>
        </>
    );
};

export default Layout;
