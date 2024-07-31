import ReactDropdown from "react-dropdown";
import classes from './Dropdown.module.scss';
import Arrow from "@components/UI/Arrows/Arrow.jsx";
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";


const variants = {
    colorGray: 'colorGray',
};

const types = {
    basic: {
        name: 'basic',
        placeholder: 'Select option',
    },
    location: {
        name: 'location',
        placeholder: 'Select location',
        className: classes['dropdown-location'],
        placeholderClass: classes['dropdown-location__placeholder'],
        controlClass: classes['dropdown-location__control'],
        menuClass: classes['dropdown-location__menu'],
    },
    ordering: {
        name: 'ordering',
        placeholder: 'Sorting',
        placeholderClass: classes['dropdown-ordering__placeholder'],
    }
};


const Dropdown = ({
    options,
    type = types.basic.name,
    variants = [],
    placeholderText,
    className,
    controlClass = classes.dropdown__control,
    placeholderClass = classes.dropdown__placeholder,
    menuClass = classes.dropdown__menu,
    arrowClosed = <Arrow />,
    arrowOpened = <Arrow reflectVertical />,
    onChange,
    value
}) => {
    let placeholder = types.basic.placeholder;

    if (type === types.location.name) {
        placeholder = types.location.placeholder;
        className += ` ${types.location.className}`;
        controlClass += ` ${types.location.controlClass}`;
        placeholderClass += ` ${types.location.placeholderClass}`;
        menuClass += ` ${types.location.menuClass}`;
    } else if (type === types.ordering.name) {
        placeholder = types.ordering.placeholder;
        placeholderClass += ` ${types.ordering.placeholderClass}`;
    }

    const combinedClasses = combineClassNames(classes.dropdown, [
        className,
        ...expandVariants(classes, variants),
    ]);


    return <ReactDropdown
        options={options}
        placeholder={placeholderText ?? placeholder}
        className={combinedClasses}
        controlClassName={controlClass}
        menuClassName={menuClass}
        placeholderClassName={placeholderClass}
        arrowClosed={arrowClosed}
        arrowOpen={arrowOpened}
        onChange={onChange}
        value={value}
    />;
};

Dropdown.variants = variants;
Dropdown.types = types;

export default Dropdown;