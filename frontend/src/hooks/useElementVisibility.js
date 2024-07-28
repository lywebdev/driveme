import { useState, useEffect, useCallback } from 'react';

const useVisibilityElement = (ref, rootMargin = '0px') => {
    const [isIntersecting, setIntersecting] = useState(false);

    const handleIntersection = useCallback(([entry]) => {
        setIntersecting(entry.isIntersecting);
    }, []);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(handleIntersection, { rootMargin });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, handleIntersection, rootMargin]);

    return isIntersecting;
};

export default useVisibilityElement;
