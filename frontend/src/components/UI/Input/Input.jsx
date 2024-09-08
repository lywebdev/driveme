import classes from './Input.module.scss';
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";

const types = {
    default: 'text',
    password: 'password',
};

const variants = {
    notHigh: 'not-high',
    unsetMinWidth: 'unset-min-width',
    unsetShadow: 'unset-shadow',
    whiteBg: 'white-bg',
    placeholderGray: 'placeholder-gray',
};

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