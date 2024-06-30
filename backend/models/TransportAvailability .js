import mongoose from "mongoose";

const { Schema } = mongoose;

const TransportAvailabilitySchema = new Schema({
  transportId: {
    type: Schema.Types.ObjectId,
    ref: "Transport",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // TODO create slotsSchema to be referenced
  slots: [
    {
      start: { type: Number, required: true },
      end: { type: Number, required: true },
      available: { type: Boolean, required: true },
    },
  ],
});

const TransportAvailability = mongoose.model(
  "TransportAvailability",
  TransportAvailabilitySchema
);

export default TransportAvailability;
