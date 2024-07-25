import styles from "./RentalForm.module.scss";
import Input from "@components/UI/Input/Input";
import Button from "@components/UI/Button/Button";
import Dropdown from "@components/UI/Dropdown/Dropdown";

const RentalForm = () => {
    return (
        <div className={styles.rental_form}>
            <form action="" >
                <h1>Rent Period</h1>
                <hr />
                <Dropdown options={[]} placeholder="Select date" className={styles.rental_form__dropdown} />
                <Dropdown options={[]} placeholder="Select date" className={styles.rental_form__dropdown} />
                <Input  type="text" id="" placeholder="Pickup location" className={styles.rental_form__input} />

                <Button isSubmit variants={[Button.types.action, Button.types.fullWidth]} className={styles.rental_form__button}>Continue</Button>
            </form>
        </div>
    );
};

export default RentalForm;