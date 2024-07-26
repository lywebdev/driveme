import styles from './Popup.module.scss';
import useShowHide from '../../../hooks/useShowHide';

const Popup = ({
    children,
    onClose,
    hideTo = 'bottom',
    showFrom = 'bottom',
    type = 'info',
    duration,
    delay = 0 
}) => {
    const [show, animateOut] = useShowHide(delay, duration, onClose, false);


    return (
        <div
            className={`${styles.popup_container} ${
                show ? styles[`show-from-${showFrom}`] : ''
            } ${animateOut ? styles[`hide-to-${hideTo}`] : ''} ${styles[type]}`}
        >
            <div className={styles.popup_content}>
                {children}
              
            </div>
        </div>
    );
};

export default Popup;