import {NavLink} from "react-router-dom";
import classes from './Button.module.scss';
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";

const types = {
    grayLighter: 'gray--lighter',
    rounded: 'rounded',
};

const Button = ({url, children, className, variants, ...props}) => {
    const combinedClasses = combineClassNames([classes.btn, ...expandVariants(classes, variants)], className);

    if (url) {
        return (
            <NavLink
                to={url}
                className={combinedClasses}
                aria-label={children}
                {...props}
            >{children}</NavLink>
        );
    }

    return (
        <button
            className={combinedClasses}
            aria-label={children}
            {...props}
        >{children}</button>
    );
};

Button.types = types;

export default Button;