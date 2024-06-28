const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
module.exports = TransportType;
