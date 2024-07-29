import styles from './Popup.module.scss';
import useShowHide from '../../../hooks/useShowHide';
import Button from '@components/UI/Button/Button.jsx';
import {capitalizeFirstLetter, combineClassNames} from "@helpers/stringHelper.js";

const Popup = ({
    text,
    buttonText,
    onClose,
    hideTo = 'bottom',
    showFrom = 'bottom',
    type = 'info',
    delay = 0,
    visibilityDuration,
    hideAnimationDuration = 1000
}) => {
    const [show, animateOut, triggerHideAnimation] = useShowHide(delay, visibilityDuration, hideAnimationDuration, onClose);
    const combinedClasses = combineClassNames(styles.popupContainer, [
        show ? styles[`showFrom${capitalizeFirstLetter(showFrom)}`] : null,
        animateOut ? styles[`hideTo${capitalizeFirstLetter(hideTo)}`] : null,
        styles[type],
    ]);

    const handleClose = () => {
        triggerHideAnimation();
    };



    return (
        <div
            className={combinedClasses}
        >
            <div className={styles.popupContent}>
                <p>{text}</p>
                <Button onClick={handleClose}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default Popup;