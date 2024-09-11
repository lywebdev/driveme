import mongoose from "mongoose";
import SlotOverlapError from "./errors/SlotOverlapError.js";

const {Schema} = mongoose;

const SlotSchema = new Schema({
    start: {
        type: Number,
        required: true,
    },
    end: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    transportId: {
        type: Schema.Types.ObjectId,
        ref: 'Transport',
        required: true,
    },
});

SlotSchema.index({ start: 1, end: 1, date: 1, vehicle: 1 }, { unique: true });

SlotSchema.pre("save", async function (next) {
    const slot = this;

    if (this.start >= this.end) {
        next(new Error("Start time must be before end time"));
    } else if (this.end - this.start < 60) {
        next(new Error("Slot must be at least one hour long"));
    }

    try {
        // We are looking for overlapping slots for the same vehicle on the same date
        const overlappingSlot = await mongoose.model('Slot').findOne({
            transport: slot.transport,
            date: slot.date,
            $or: [
                {
                    start: { $lt: slot.end },  // A new slot starts before the end of the existing one
                    end: { $gt: slot.start }   // The new slot ends after the existing one starts
                }
            ]
        });

        if (overlappingSlot) {
            next(new SlotOverlapError("Slot overlaps with an existing slot"));
        }

        next();
    } catch (err) {
        next(err);
    }
});

const Slot = mongoose.model("Slot", SlotSchema, "slots");

export default Slot;
