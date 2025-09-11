import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.config.js";
import { Socket } from "dgram";
import devicesRoute from "./routes/devices.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/devices", devicesRoute);

app.get("/", (req, res) => res.send("API is running..."));

app.set("io", io);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`app running on ${port}`);
    });
  })
  .catch((err) => console.log("Error while connecting", err));
