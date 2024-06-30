import mongoose from "mongoose";

const { Schema } = mongoose;

const TransportAvailabilitySchema = new Schema({
  // TODO create TransportSchema to be referenced
  transportId: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  ],
});

const TransportAvailability = mongoose.model(
  "TransportAvailability",
  TransportAvailabilitySchema
);

export default TransportAvailability;
