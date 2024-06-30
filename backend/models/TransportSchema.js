import mongoose from "mongoose";

const { Schema } = mongoose;

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
    // TODO: Update to Schema.Types.ObjectId and ref once TransportType schema is defined
    transportTypeId: {
      type: String,
      required: true,
    },
    // TODO: Update to Schema.Types.ObjectId and ref once Owner schema is defined
    ownerId: {
      type: String,
      required: true,
    },
    // TODO: Update to Schema.Types.ObjectId and ref once LocationData schema is defined
    locationDataId: {
      type: String,
      required: true,
    },
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
  },
);

const Transport = mongoose.model("Transport", TransportSchema);

export default Transport;
