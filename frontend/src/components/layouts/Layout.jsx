import Header from "@layouts/Header.jsx";
import Footer from "@layouts/Footer.jsx";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import AppLoadingOverlay from "@components/shared/Overlay/AppLoadingOverlay.jsx";
import Popup from "@components/UI/Popup/Popup.jsx";
import useConsent from '../../hooks/useConsent.js';

const Layout = () => {
    const { appIsLoading } = useAuth();
    const [consentGiven, giveConsent] = useConsent();

    const handleConsent = () => {
        giveConsent();
    };

    return (
        <>
            <AppLoadingOverlay loaderVisible={appIsLoading} />
            {!appIsLoading && (
                <>
                    <Header />
                    <div id="body">
                        <Outlet />
                        {!consentGiven && (
                            <Popup
                                onClose={handleConsent}
                                hideTo="bottom"
                                showFrom="bottom"
                                type="info"
                                text="We use cookies to enhance your experience. Do you accept our cookie policy?"
                                buttonText="I Accept"
                            >
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
