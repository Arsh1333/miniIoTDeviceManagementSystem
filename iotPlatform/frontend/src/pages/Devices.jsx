import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/devices").then((res) => setDevices(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // go back to login
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Devices</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <ul className="space-y-2">
        {devices.map((d) => (
          <li key={d._id} className="border p-2">
            <Link to={`/devices/${d._id}`} className="text-blue-500 underline">
              {d.uid}
            </Link>
            <div>Last Temp: {d.latest?.temp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
