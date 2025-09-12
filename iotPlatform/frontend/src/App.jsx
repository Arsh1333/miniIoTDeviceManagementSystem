import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Devices from "./pages/Devices";
import DeviceDetail from "./pages/DeviceDetail";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route
              path="/"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/devices" />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetail />} />
            <Route path="*" element={<Navigate to="/devices" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
