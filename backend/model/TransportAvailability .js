const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransportAvailabilitySchema = new Schema({
// TODO create TransportSchema to be referenced
  transportId: {
    type: Number,
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
module.exports = TransportAvailability;
