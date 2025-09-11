import mongoose from "mongoose";

const TelemetrySchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  temp: Number,
  hum: Number,
  pm25: Number,
  tts: Number,
  serverTime: { type: Date, default: Date.now },
});

export default mongoose.model("Telemetry", TelemetrySchema);
