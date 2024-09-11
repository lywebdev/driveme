import classes from "@components/features/OrderSteps/OrderModalForm.module.scss";
import Input from "@components/UI/Input/Input.jsx";
import Button from "@components/UI/Button/Button.jsx";
import {useSteps} from "react-step-builder";
import useOrderContext from "../../../hooks/contexts/useOrderContext.js";
import StripeService from "../../../services/StripeService.js";
import {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@components/features/OrderSteps/CheckoutForm.jsx";

const BillingForm = () => {
    const { prev } = useSteps();
    const { billing, setBilling } = useOrderContext();

    const stripePromise = loadStripe('pk_test_51PxotJRpksPoFQZyPtBKXcmkTLDKCilnlfhQSqC74UD1LrU9EUTmAF7XcwIq05E79GMn0BmbCbroovBWfy03eQpt00wDTymeIs');


    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");

    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await StripeService.createPaymentIntent(1000);

            setDpmCheckerLink(response.data.dpmCheckerLink);
            setClientSecret(response.data.clientSecret);
        };

        fetchClientSecret();

        // Create PaymentIntent as soon as the page loads
        // fetch("/create-payment-intent", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setClientSecret(data.clientSecret);
        //         // [DEV] For demo purposes only
        //         setDpmCheckerLink(data.dpmCheckerLink);
        //     });
    }, []);


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };



    // const handlePaymentSuccess = (paymentIntent) => {
    //     alert('Payment successful!');
    //     console.log(paymentIntent);
    // };

    // const handlePayment = async () => {
    //     const response = await StripeService.createPaymentIntent(1000);
    //
    //     const clientSecret = response.data.clientSecret;
    //
    //     // const cardElement = elements.getElement(CardElement);
    //
    //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: {
    //                 number: billing.cardNumber,
    //                 exp_month: billing.expirationDate.split('/')[0],
    //                 exp_year: billing.expirationDate.split('/')[1],
    //                 cvc: billing.cvc,
    //             },
    //         },
    //     });
    //
    //     if (error) {
    //         //
    //     } else if (paymentIntent.status === 'succeeded') {
    //         handlePaymentSuccess(paymentIntent);
    //     }
    // };

    const onPayHandle = async () => {
        const response = await StripeService.createPaymentIntent(1000);

        const clientSecret = response.data.clientSecret;

        setClientSecret(clientSecret);
    };

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
                            placeholder="Card number (4242 4242 4242 4242)"
                            value={billing.cardNumber}
                            onChange={handleChange}
                        />
                        <Input
                            name="expirationDate"
                            placeholder="Expiry date (12/34)"
                            value={billing.expirationDate}
                            onChange={handleChange}
                        />
                        <Input
                            type={Input.types.password}
                            name="cvv"
                            placeholder="CVV (123)"
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
                        ]}
                        onClick={onPayHandle}
                    >Get the bill</Button>
                </div>
            </div>

            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
                    </Elements>
                )
            }
        </div>
    );
};

export default BillingForm;
