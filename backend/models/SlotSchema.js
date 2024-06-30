import mongoose from "mongoose";

const { Schema } = mongoose;

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
});

SlotSchema.pre("save", function (next) {
  if (this.start >= this.end) {
    next(new Error("Start time must be before end time"));
  } else if (this.end - this.start < 60) {
    next(new Error("Slot must be at least one hour long"));
  } else {
    next();
  }
});

const Slot = mongoose.model("Slot", SlotSchema);

export default Slot;
