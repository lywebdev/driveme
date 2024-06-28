const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const TransportAvailabilitySchema = new Schema ({

    //TODO create TransportSchema to be referenced
    transport_id: {
        type: Number
    },

    date: {
        type: Date,
        required: true
    },

    slots: [{
        //TODO add "slots" model to be referenced
        type: mongoose.Schema.Types.ObjectId,
        ref: "slots"
    }]

})

const TransportAvailability = mongoose.model("TransportAvailability", TransportAvailabilitySchema);
module.exports = TransportAvailability