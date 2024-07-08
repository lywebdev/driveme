import {NavLink} from "react-router-dom";
import classes from './Button.module.scss';

const Button = ({url, children, className, ...props}) => {
    const combinedClassName = [classes.btn, className].filter(Boolean).join(' ');

    if (url) {
        return (
            <NavLink
                to={url}
                className={combinedClassName}
                aria-label={children}
                {...props}
            >{children}</NavLink>
        );
    }

    return (
        <button
            className={combinedClassName}
            aria-label={children}
            {...props}
        >{children}</button>
    );
};

export default Button;