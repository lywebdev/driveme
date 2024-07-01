import mongoose from "mongoose";

const { Schema } = mongoose;

const TransportLocationDataSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  transport: {
    type: Schema.Types.ObjectId,
    ref: "Transport",
  },
});

const TransportLocationData = mongoose.model(
  "TransportLocationData",
  TransportLocationDataSchema
);

export default TransportLocationData;
