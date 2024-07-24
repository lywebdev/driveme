import classes from './Input.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";

const types = {
    default: 'text',
    password: 'password',
};

const Input = ({
    onChange,
    value = null,
    placeholder,
    name,
    type,
    isInvalid
}) => {
    const combinedClasses = combineClassNames(classes.input, isInvalid ? classes.invalid : null);

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

export default Input;