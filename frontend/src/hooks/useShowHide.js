import { useState, useEffect } from 'react';

const useShowHide = (delay, visibilityDuration, hideAnimationDuration, onClose) => {
    const [show, setShow] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        const showTimeout = setTimeout(() => {
            setShow(true);
        }, delay);

        let hideTimeout;
        if (visibilityDuration) {
            hideTimeout = setTimeout(() => {
                setAnimateOut(true);
                setTimeout(onClose, hideAnimationDuration);
            }, delay + visibilityDuration);
        }

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [delay, visibilityDuration, hideAnimationDuration, onClose]);

    const triggerHideAnimation = () => {
        setAnimateOut(true);
        setTimeout(onClose, hideAnimationDuration);
    };

    return [show, animateOut, triggerHideAnimation];
};

export default useShowHide;