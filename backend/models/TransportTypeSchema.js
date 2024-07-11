import mongoose from "mongoose";

const {Schema} = mongoose;

const TransportTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: null,
    },
});

const TransportType = mongoose.model("TransportType", TransportTypeSchema, "transportTypes");

export default TransportType;
