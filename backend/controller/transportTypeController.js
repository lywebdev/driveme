import TransportType from "../models/TransportTypeSchema.js";
import mongoose from "mongoose";

const findAll = async (req, res) => {
  try {
    const transportTypes = await TransportType.find();
    res.json({ message: "success", transportTypes: transportTypes });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error", data: err });
  }
};

const store = async (req, res) => {
  try {
    const { id, name, photo } = req.body;

    if (!id || !name) {
      throw { status: 400, message: "Missing required fields" };
    }
    const newTransportType = new TransportType({ id, name, photo });
    const savedTransportType = await newTransportType.save();
    res.status(201).json({ message: "success", data: savedTransportType });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error", data: err });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await TransportType.findByIdAndDelete(id);
    res.json({ message: "success" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error", data: err });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      throw { status: 400, message: "Invalid id format" };
    }

    const { name, photo } = req.body;

    const updatedTransportType = await TransportType.findByIdAndUpdate(
      id,
      { name, photo },
      { new: true }
    );

    if (!updatedTransportType) {
      return res.status(404).json({ message: "Transport type not found" });
    }

    res.json({ message: "success", data: updatedTransportType });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error", data: err });
  }
};

export default { findAll, store, destroy, update };
