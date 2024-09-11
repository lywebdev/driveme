import $api from "@config/http.js";

export default class StripeService {
    static async createPaymentIntent(amount) {
        return $api.post('/transactions/create-payment-intent', {
            amount: amount,
        });
    }
}