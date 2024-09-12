import mongoose from "mongoose";

const {Schema} = mongoose;

const TransportSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        transportTypeId: {
            type: Schema.Types.ObjectId,
            ref: "TransportType",
            required: true,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        locationDataId: {
            type: Schema.Types.ObjectId,
            ref: "TransportLocationData",
            required: true,
        },
        slots: [{
            type: Schema.Types.ObjectId,
            ref: 'Slot',
        }],
        description: {
            type: String,
            trim: true,
        },
        hasDelivery: {
            type: Boolean,
            required: true,
        },
        photos: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        slug: {
            type: String,
            unique: true,
        }
    },
);

const Transport = mongoose.model("Transport", TransportSchema, "transports");

export default Transport;
