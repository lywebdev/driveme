import classes from "@components/features/OrderSteps/OrderModalForm.module.scss";
import Input from "@components/UI/Input/Input.jsx";
import Button from "@components/UI/Button/Button.jsx";
import {useSteps} from "react-step-builder";
import useOrderContext from "../../../hooks/contexts/useOrderContext.js";

const BillingForm = () => {
    const { prev } = useSteps();
    const { billing, setBilling } = useOrderContext();

    const handleChange = (e) => {
        setBilling({...billing, [e.target.name]: e.target.value});
    };


    return (
        <div className={classes.orderModalForm}>
            <h2 className={classes.title}>Billing information</h2>
            <div className={classes.formContainer}>

                <div className={classes.row}>
                    <div className={`${classes.col} ${classes.paymentCol}`}>
                        <Input
                            name="cardNumber"
                            placeholder="Номер карты"
                            value={billing.cardNumber}
                            onChange={handleChange}
                        />
                        <Input
                            name="expirationDate"
                            placeholder="Дата истечения (MM/YY)"
                            value={billing.expirationDate}
                            onChange={handleChange}
                        />
                        <Input
                            type={Input.types.password}
                            name="cvv"
                            placeholder="CVV"
                            value={billing.cvv}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${classes.col} ${classes.addressCol}`}>
                        <Input
                            name="country"
                            placeholder="Your country"
                            value={billing.country}
                            onChange={handleChange}
                        />
                        <Input
                            name="city"
                            placeholder="Your city"
                            value={billing.city}
                            onChange={handleChange}
                        />
                        <Input
                            name="address"
                            placeholder="Your address with postal code"
                            value={billing.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={classes.buttons}>
                    <Button onClick={prev} className={classes.backBtn}>Back</Button>
                    <Button
                        className={classes.payBtn}
                        variants={[
                            Button.variants.successful,
                            Button.variants.action,
                            Button.variants.bold,
                        ]
                        }>Pay</Button>
                </div>
            </div>
        </div>
    );
};

export default BillingForm;
