import $api from "@config/http.js";

export default class PaymentService {
    static async createPayment(paymentData) {
        return $api.post('/payments', {
            amount: paymentData.amount,
            orderId: paymentData.orderId,

            stripePaymentIntentId: paymentData.stripePaymentIntentId,
            stripeStatus: paymentData.stripeStatus,
        });
    }
}