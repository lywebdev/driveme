import { useState, useEffect } from 'react';

const useShowHide = (delay, duration, onClose) => {
    const [show, setShow] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        let showTimer;
        let hideTimer;
        let closeTimer;

        showTimer = setTimeout(() => {
            setShow(true);
        }, delay);

        if (duration) {
            hideTimer = setTimeout(() => {
                setAnimateOut(true);
                setTimeout(() => {
                    setShow(false);
                }, 1000); 
            }, delay + duration);
        }

        closeTimer = setTimeout(() => {
            if (!show) {
                onClose();
            }
        }, (delay + duration || 0) + 2000); 

        return () => {
            if (showTimer) clearTimeout(showTimer);
            if (hideTimer) clearTimeout(hideTimer);
            if (closeTimer) clearTimeout(closeTimer);
        };
    }, [delay, duration, onClose, show]);

    return [show, animateOut, setAnimateOut];
};

export default useShowHide;
