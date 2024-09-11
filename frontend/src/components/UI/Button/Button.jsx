import {NavLink} from "react-router-dom";
import classes from './Button.module.scss';
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";

const variants = {
    grayLighter: 'gray--lighter',
    rounded: 'rounded',
    action: 'action',
    fullWidth: 'fw',
    successful: 'successful',
    bold: 'fb'
};

const Button = ({url, children, className, variants, isSubmit, ...props}) => {
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
            type={isSubmit ? 'submit' : 'button'}
            {...props}
        >{children}</button>
    );
};

Button.variants = variants;

export default Button;