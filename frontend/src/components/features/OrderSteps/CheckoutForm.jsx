import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import '@pages/styles/Order.scss';
import useOrderContext from "../../../hooks/contexts/useOrderContext.js";
import OrderService from "../../../services/OrderService.js";
import env from "@config/env.js";

export default function CheckoutForm({ dpmCheckerLink, clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();

    const {contact, transport, calculated} = useOrderContext();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        try {
            const response = await OrderService.createOrder({
                ...contact,

                price: transport.cost,
                totalPrice: calculated.totalPrice,
                pickupLocation: calculated.location,

                transportId: transport.id,
                startDate: calculated.startDate,
                endDate: calculated.endDate,

                startTime: calculated.startTime,
                endTime: calculated.endTime,

                days: calculated.daysQuantity,
            }, clientSecret);

            if (response.data.isSuccess === true) {
                const { error } = await stripe.confirmPayment({
                    clientSecret: clientSecret,
                    elements,
                    confirmParams: {
                        // Make sure to change this to your payment completion page
                        return_url: `${env.frontendUrl}/completed`,
                    },
                });

                // This point will only be reached if there is an immediate error when
                // confirming the payment. Otherwise, your customer will be redirected to
                // your `return_url`. For some payment methods like iDEAL, your customer will
                // be redirected to an intermediate site first to authorize the payment, then
                // redirected to the `return_url`.
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            }

        } catch (err) {
            setMessage("Error when saving order data");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };

    return (
        <div className='stripe-container'>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
            <div id="dpm-annotation">
                <p style={{marginTop: '15px'}}>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
                </p>
            </div>
        </div>
    );
}