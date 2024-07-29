import { useState, useEffect } from 'react';

const useConsent = () => {
    const [cookieConsentFlag, setCookieConsentFlag] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setCookieConsentFlag(true);
        }
    }, []);

    const giveConsent = () => {
        localStorage.setItem('cookieConsent', 'true');
        setCookieConsentFlag(true);
    };

    return [cookieConsentFlag, giveConsent];
};

export default useConsent;
