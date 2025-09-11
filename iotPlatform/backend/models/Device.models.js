import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  fw: { type: String },
  lastSeen: { type: Date, default: Date.now },
});

export const Device = mongoose.model("Device", DeviceSchema);
