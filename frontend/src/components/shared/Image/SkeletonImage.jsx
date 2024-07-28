import React, {useEffect, useRef} from 'react';
import classes from './SkeletonImage.module.scss';
import useVisibilityElement from "../../../hooks/useElementVisibility.js";
import {combineClassNames} from "@helpers/stringHelper.js";

const SkeletonImage = (props) => {
    const { src, alt = '', onLoad = () => {}, className } = props;
    const [isLoaded, setIsLoaded] = React.useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const isVisible = useVisibilityElement(containerRef);

    const combinedClasses = combineClassNames(classes.container, [
        className,
        isLoaded ? classes.containerLoaded : null,
    ]);

    useEffect(() => {
        if (!isVisible || isLoaded) {
            return;
        }

        if (imageRef.current) {
            imageRef.current.onload = () => {
                setIsLoaded(true);
                onLoad();
            };
        }
    }, [isVisible, onLoad, isLoaded]);


    return (
        <div
            ref={containerRef}
            className={combinedClasses}
        >
            {(isVisible || isLoaded) && (
                <img
                    ref={imageRef}
                    className={`${classes.image} ${isLoaded ? classes.imageLoaded : ''}`}
                    src={src}
                    alt={alt}
                />
            )}
        </div>
    );
};

export default SkeletonImage;