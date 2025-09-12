import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
      navigate("/devices");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          IoT Dashboard
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
