import styles from './Popup.module.scss';
import useShowHide from '../../../hooks/useShowHide';
import Button from '@components/UI/Button/Button.jsx';

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

    const handleClose = () => {
        triggerHideAnimation();
    };

    return (
        <div
            className={`${styles.popup_container} ${
                show ? styles[`show-from-${showFrom}`] : ''
            } ${animateOut ? styles[`hide-to-${hideTo}`] : ''} ${styles[type]}`}
        >
            <div className={styles.popup_content}>
                <p>{text}</p>
                <Button onClick={handleClose}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default Popup;