import classes from "@components/features/OrderSteps/OrderModalForm.module.scss";
import Button from "@components/UI/Button/Button.jsx";
import {useSteps} from "react-step-builder";
import StripeService from "../../../services/StripeService.js";
import {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@components/features/OrderSteps/CheckoutForm.jsx";

const BillingForm = ({ totalPrice }) => {
    const { prev } = useSteps();

    const stripePromise = loadStripe('pk_test_51PxotJRpksPoFQZyPtBKXcmkTLDKCilnlfhQSqC74UD1LrU9EUTmAF7XcwIq05E79GMn0BmbCbroovBWfy03eQpt00wDTymeIs');

    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");

    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await StripeService.createPaymentIntent(totalPrice);

            setDpmCheckerLink(response.data.dpmCheckerLink);
            setClientSecret(response.data.clientSecret);
        };

        fetchClientSecret();
    }, []);


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div className={classes.orderModalForm}>
            <h2 className={classes.title} style={{marginBottom: '35px'}}>Billing information</h2>
            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
                    </Elements>
                )
            }
            <Button onClick={prev} className={classes.backBtn}>Back</Button>
        </div>
    );
};

export default BillingForm;
