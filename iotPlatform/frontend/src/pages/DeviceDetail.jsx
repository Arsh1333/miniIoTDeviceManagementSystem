import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api";

const socket = io("http://localhost:5000"); // backend URL

export default function DeviceDetail() {
  const { id } = useParams();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    // fetch last 10 readings
    API.get(`/devices/${id}/data`).then((res) => setReadings(res.data));

    // listen for live updates
    socket.on("new-reading", (data) => {
      if (data.device === id) {
        setReadings((prev) => [data, ...prev.slice(0, 9)]);
      }
    });

    return () => socket.off("new-reading");
  }, [id]);

  return (
    <div className="p-6">
      <Link to="/devices" className="text-blue-500 underline">
        ⬅ Back
      </Link>
      <h1 className="text-2xl mb-4">Device {id}</h1>

      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Temp</th>
            <th className="px-4 py-2">Hum</th>
            <th className="px-4 py-2">PM2.5</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r, idx) => (
            <tr key={idx} className="text-center border-b">
              <td>{r.temp}</td>
              <td>{r.hum}</td>
              <td>{r.pm25}</td>
              <td>{new Date(r.serverTime).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
