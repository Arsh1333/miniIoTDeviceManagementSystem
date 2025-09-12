import express from "express";
import Device from "../models/Device.models.js";
import Telemetry from "../models/Telemetry.models.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const devices = await Device.find();
    const result = [];

    for (let d of devices) {
      const latest = await Telemetry.findOne({ deviceId: d._id })
        .sort({ serverTime: -1 })
        .lean();
      result.push({ ...d.toObject(), latest });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/data", authMiddleware, async (req, res) => {
  try {
    const data = await Telemetry.find({ deviceId: req.params.id })
      .sort({ serverTime: -1 })
      .limit(10)
      .lean();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
