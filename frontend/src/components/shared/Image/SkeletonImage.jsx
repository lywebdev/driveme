import {useEffect, useRef, useState} from 'react';
import classes from './SkeletonImage.module.scss';
import useVisibilityElement from "../../../hooks/useElementVisibility.js";
import {combineClassNames} from "@helpers/stringHelper.js";

const SkeletonImage = (props) => {
    const { src, alt = '', onLoad = () => {}, className } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const isVisible = useVisibilityElement(containerRef);

    const combinedClasses = combineClassNames(classes.container, [
        className,
        isLoaded ? classes.containerLoaded : null,
    ]);

    useEffect(() => {
        const imgElement = imageRef.current;

        if (imgElement) {
            const handleLoad = () => {
                setIsLoaded(true);
                onLoad();
            };

            imgElement.addEventListener('load', handleLoad);
            imgElement.addEventListener('error', () => {
                console.log('Error loading image');
            });

            // Check if image is already loaded
            if (imgElement.complete) {
                handleLoad();
            }

            return () => {
                imgElement.removeEventListener('load', handleLoad);
                imgElement.removeEventListener('error', () => {
                    console.log('Error loading image');
                });
            };
        }
    }, [isVisible, onLoad, isLoaded, imageRef]);


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