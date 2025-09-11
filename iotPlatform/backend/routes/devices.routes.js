import express from "express";
import Device from "../models/Device.models.js";
import Telemetry from "../models/Telemetry.models.js";

const router = express.Router();

// GET /devices - test route
router.get("/test", async (req, res) => {
  try {
    // Create or find device
    let device = await Device.findOne({ uid: "123456" });
    if (!device) {
      device = await Device.create({ uid: "123456", fw: "1.0.0.0" });
    }

    // Add telemetry
    await Telemetry.create({
      deviceId: device._id,
      temp: 23.44,
      hum: 65.45,
      pm25: 12,
      tts: Math.floor(Date.now() / 1000),
    });

    res.json({ msg: "Sample telemetry inserted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
