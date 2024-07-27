import classes from "./RentalForm.module.scss";
import Input from "@components/UI/Input/Input";
import Button from "@components/UI/Button/Button";
import Dropdown from "@components/UI/Dropdown/Dropdown";
import {combineClassNames} from "@helpers/stringHelper.js";

const RentalForm = ({className}) => {
    const combinedClasses = combineClassNames(className, classes.form);


    return (
        <div className={combinedClasses}>
            <form action="">
                <div className={classes.title}>Rent Period</div>
                <Dropdown options={[]} placeholder="Select date" className={classes.dropdown} />
                <Dropdown options={[]} placeholder="Select date" className={classes.dropdown} />
                <Input variants={[Input.variants.notHigh, Input.variants.unsetMinWidth]} placeholder="Pickup location" />

                <Button isSubmit variants={[Button.types.action, Button.types.fullWidth]} className={classes.button}>Continue</Button>
            </form>
        </div>
    );
};

export default RentalForm;