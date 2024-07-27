import classes from './Input.module.scss';
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";

const types = {
    default: 'text',
    password: 'password',
};

const variants = {
    notHigh: 'not-high',
    unsetMinWidth: 'unset-min-width',
};

// добавить вариант инпута типо как у селекта

const Input = ({
    onChange,
    value = null,
    placeholder,
    name,
    type,
    isInvalid,
    variants,
}) => {
    const combinedClasses = combineClassNames(
        classes.input,
        [
            isInvalid ? classes.invalid : null,
            ...expandVariants(classes, variants),
        ]
    );

    // const combinedClasses = combineClassNames([classes.container, ...expandVariants(classes, variants)], className);


    return <input
        className={combinedClasses}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={types[type] ?? types.default}
    />;
};

Input.types = types;
Input.variants = variants;

export default Input;