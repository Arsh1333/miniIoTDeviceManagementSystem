import mqtt from "mqtt";
import Device from "../models/Device.models.js";
import Telemetry from "../models/Telemetry.models.js";
import { decodeLittleEndian } from "../utils/decode.utils.js";

const startMqttWorker = (io) => {
  console.log(" Starting MQTT Worker, broker:", process.env.MQTT_BROKER);

  const client = mqtt.connect(process.env.MQTT_BROKER);

  client.on("connect", () => {
    console.log(" Connected to MQTT broker:", process.env.MQTT_BROKER);
    client.subscribe("/application/out/+", (err) => {
      if (err) {
        console.error("Error subscribing:", err.message);
      } else {
        console.log("Subscribed to /application/out/+");
      }
    });
  });

  client.on("error", (err) => {
    console.error(" MQTT Client Error:", err.message);
  });

  client.on("message", async (topic, message) => {
    console.log("Raw MQTT message received on topic:", topic);
    console.log("Payload string:", message.toString());

    try {
      const payload = JSON.parse(message.toString());

      // Decode telemetry values
      const decoded = {
        uid: payload.uid,
        fw: payload.fw,
        tts: payload.tts,
        data: {
          temp: decodeLittleEndian(payload.data.temp),
          hum: decodeLittleEndian(payload.data.hum),
          pm25: decodeLittleEndian(payload.data["pm2.5"]),
        },
      };

      console.log("Decoded telemetry:", decoded);

      // Find or create device
      let device = await Device.findOne({ uid: decoded.uid });
      if (!device) {
        device = await Device.create({ uid: decoded.uid, fw: decoded.fw });
        console.log("New device created:", decoded.uid);
      }
      device.lastSeen = new Date();
      await device.save();

      // Save telemetry
      const telemetry = await Telemetry.create({
        deviceId: device._id,
        temp: decoded.data.temp,
        hum: decoded.data.hum,
        pm25: decoded.data.pm25,
        tts: decoded.tts,
      });

      console.log("Saved telemetry to DB:", telemetry);

      // Emit to frontend via WebSocket
      io.emit("new-reading", {
        device: device.uid,
        ...decoded.data,
        serverTime: telemetry.serverTime,
      });
    } catch (err) {
      console.error(" Error processing MQTT message:", err.message);
    }
  });
};

export default startMqttWorker;
