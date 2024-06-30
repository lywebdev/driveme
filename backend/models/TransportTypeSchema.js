import mongoose from "mongoose";

const { Schema } = mongoose;

const TransportTypeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },
});

const TransportType = mongoose.model("TransportType", TransportTypeSchema);

export default TransportType;
