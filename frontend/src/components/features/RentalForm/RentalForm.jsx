import classes from "./RentalForm.module.scss";
import Input from "@components/UI/Input/Input";
import Button from "@components/UI/Button/Button";
import {combineClassNames} from "@helpers/stringHelper.js";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "@components/UI/Datepicker/Datepicker.jsx";
import {useState} from "react";


const RentalForm = ({className}) => {
    const [location, setLocation] = useState('');

    const onChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const combinedClasses = combineClassNames(className, []);


    return (
        <div className={combinedClasses}>
            <form action="" className={classes.form}>
                <div className={classes.title}>Rent Period</div>
                {/*<Dropdown options={[]} placeholder="Select date" className={classes.dropdown} variants={[*/}
                {/*    Dropdown.variants.colorGray,*/}
                {/*    Dropdown.variants.unsetShadow,*/}
                {/*]} />*/}
                {/*<Dropdown options={[]} placeholder="Select date" className={classes.dropdown} variants={[*/}
                {/*    Dropdown.variants.colorGray,*/}
                {/*    Dropdown.variants.unsetShadow,*/}
                {/*]} />*/}

                <DateRangePicker />

                <Input variants={[
                    Input.variants.notHigh,
                    Input.variants.unsetMinWidth,
                    Input.variants.whiteBg,
                    Input.variants.colorGray,
                    Input.variants.unsetShadow,
                ]}
                placeholder="Pickup location"
                value={location}
                onChange={onChangeLocation}
                />

                <Button isSubmit variants={[
                    Button.types.action,
                    Button.types.fullWidth,
                ]} className={classes.button}>Continue</Button>

                <div className={classes.prices}>
                    <div className={classes.rentCalculatedPrice}>150 $ / per day</div>
                    <div className={classes.rentCalculatedTotalPrice}>
                        <span>Total</span>
                        <span>1725 $</span>
                    </div>
                </div>

                <p className={classes.rentInfo}>You are not paying for anything yet. By submitting a request, you can
                    personally discuss the details of the booking with the owner of the car</p>
            </form>
        </div>
    );
};

export default RentalForm;