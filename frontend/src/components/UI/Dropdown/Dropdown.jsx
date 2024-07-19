import {resolveAlias} from "@helpers/imageHelper.js";
import ArrowClosed from "@components/UI/Arrows/ArrowClosed.jsx";
import ArrowOpened from "@components/UI/Arrows/ArrowOpened.jsx";
import ReactDropdown from "react-dropdown";


const LocationPlaceholder = () => (
    <div className="location-placeholder">
        <img src={resolveAlias('@images/icons/locationicon.svg')} alt="Location icon" className="placeholder-icon" />
        <span>Select Location...</span>
    </div>
);

const DefaultPlaceholder = () => (
    <div className='placeholder'>
        <span>Select option</span>
    </div>
);

const variants = {
    basic: {
        name: 'basic',
        placeholder: DefaultPlaceholder,
    },
    location: {
        name: 'location',
        placeholder: `${<LocationPlaceholder />}`,
        className: 'dropdown-location',
        controlClassname: 'dropdown-location__control',
        menuClassName: 'dropdown-location__menu',
        arrowClassName: 'dropdown-location__arrow',
    },
};




const Dropdown = ({
    options,
    variant = variants.basic.name,
    className = 'dropdown',
    controlClassname = 'dropdown__control',
    menuClassname = 'dropdown__menu',
    arrowClassName = 'dropdown__arrow',
    arrowClosed = <ArrowClosed/>,
    arrowOpened = <ArrowOpened/>,
    onChange,
    value
}) => {
    let placeholder = variants.basic.placeholder;

    if (variant === variants.location) {
        placeholder = variants.location.placeholder;
        className = variants.location.className;
        controlClassname = variants.location.controlClassname;
        menuClassname = variants.location.menuClassname;
        arrowClassName = variants.location.arrowClassName;
    }


    return <ReactDropdown
        options={options}
        placeholder={placeholder()}
        className={className}
        controlClassname={controlClassname}
        menuClassname={menuClassname}
        arrowClassName={arrowClassName}
        arrowClosed={arrowClosed}
        arrowOpen={arrowOpened}
        onChange={onChange}
        value={value}
    />;
};

Dropdown.types = variants;

export default Dropdown;