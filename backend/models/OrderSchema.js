import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format',
        },
    },
    pickupLocation: {
        type: String,
        required: true,
        trim: true,
    },
    transportId: {
        type: Schema.Types.ObjectId,
        ref: 'Transport',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    clientSecret: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema, 'orders');

export default Order;