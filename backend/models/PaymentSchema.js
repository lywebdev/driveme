import mongoose from "mongoose";

const {Schema} = mongoose;

const PaymentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be a positive number'],
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    stripePaymentIntentId: {
        type: String,
        required: [true, 'Stripe Payment Intent ID is required'],
    },
    stripeStatus: {
        type: String,
        enum: ['succeeded', 'pending', 'failed'],
        default: 'pending',
    },
});

const Payment = mongoose.model(
    "Payment",
    PaymentSchema,
    "payments"
);

export default Payment;
