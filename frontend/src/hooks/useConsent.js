import { useState, useEffect } from 'react';

const useConsent = () => {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setConsentGiven(true);
        }
    }, []);

    const giveConsent = () => {
        localStorage.setItem('cookieConsent', 'true');
        setConsentGiven(true);
    };

    return [consentGiven, giveConsent];
};

export default useConsent;
