import styles from './CookieComponent.module.scss';
import Button from '@components/UI/Button/Button.jsx';
import useConsent from '../../hooks/useConsent.js';

const CookieComponent = ({ onClose }) => {
    const [consentGiven, giveConsent] = useConsent();

    const handleConsent = () => {
        giveConsent();
        if (onClose) onClose(); 
    };

    if (consentGiven) {
        return null;
    }

    return (
        <div className={styles.cookie_component}>
            <p>We use cookies to enhance your experience. Do you accept our cookie policy?</p>
            <Button onClick={handleConsent}>I Accept</Button>
        </div>
    );
};

export default CookieComponent;