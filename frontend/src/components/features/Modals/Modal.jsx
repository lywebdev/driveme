import classes from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={classes.modalOverlay} onClick={onClose}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={classes.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
