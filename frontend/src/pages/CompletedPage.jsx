import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import StripeCompletedPage from "@components/features/Stripe/StripeCompletedPage.jsx";
import {useLocation} from "react-router-dom";

const CompletedPage = () => {
    const stripePromise = loadStripe('pk_test_51PxotJRpksPoFQZyPtBKXcmkTLDKCilnlfhQSqC74UD1LrU9EUTmAF7XcwIq05E79GMn0BmbCbroovBWfy03eQpt00wDTymeIs');
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const clientSecret = queryParams.get('payment_intent_client_secret');


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <>
            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <StripeCompletedPage />
                    </Elements>
                )
            }
        </>
    );
};

export default CompletedPage;