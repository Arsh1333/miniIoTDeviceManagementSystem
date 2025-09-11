import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log("Publisher connected");

  setInterval(() => {
    const payload = {
      uid: "123456",
      fw: "1.0.0.0",
      tts: Math.floor(Date.now() / 1000),
      data: {
        temp: 1122334455, // will decode into float
        hum: 556677889,
        "pm2.5": 99887766,
      },
    };
    client.publish("/application/out/123456", JSON.stringify(payload));
    console.log(" Sent telemetry", payload);
  }, 5000);
});
