import ReactDropdown from "react-dropdown";
import classes from './Dropdown.module.scss';
import Arrow from "@components/UI/Arrows/Arrow.jsx";


const variants = {
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
    variant = variants.basic.name,
    placeholderText,
    className = classes.dropdown,
    controlClass = classes.dropdown__control,
    placeholderClass = classes.dropdown__placeholder,
    menuClass = classes.dropdown__menu,
    arrowClosed = <Arrow />,
    arrowOpened = <Arrow reflectVertical />,
    onChange,
    value
}) => {
    let placeholder = variants.basic.placeholder;

    if (variant === variants.location.name) {
        placeholder = variants.location.placeholder;
        className += ` ${variants.location.className}`;
        controlClass += ` ${variants.location.controlClass}`;
        placeholderClass += ` ${variants.location.placeholderClass}`;
        menuClass += ` ${variants.location.menuClass}`;
    } else if (variant === variants.ordering.name) {
        placeholder = variants.ordering.placeholder;
        placeholderClass += ` ${variants.ordering.placeholderClass}`;
    }


    return <ReactDropdown
        options={options}
        placeholder={placeholderText ?? placeholder}
        className={className}
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

export default Dropdown;