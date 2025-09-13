# Mini IoT Device Management System

This project is a mini IoT device management platform that demonstrates:
- Device registration
- Real-time telemetry via MQTT
- Data storage in MongoDB
- WebSocket-powered live updates
- Secure authentication (JWT)

---

## 🚀 Tech Stack
- **Backend**: Node.js, Express, MongoDB Atlas, MQTT.js, Socket.IO
- **Frontend**: React, Tailwind CSS, Vite
- **Deployment**: Render (backend), Vercel (frontend)

---

## 🔧 Setup Instructions

### 1. Clone Repo
```bash
git clone <repo-link>
cd miniIoTDeviceManagementSystem
```
### 2. Backend Setup
```bash
cd backend
npm install
```
### 3. Create a .env file in the backend folder with the following variables
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
MQTT_BROKER_URL=<your-mqtt-broker-url>
```
### 4. Start the backend server
```bash
npm run dev
```
### 5. Frontend Setup
```bash
cd ../frontend
npm install
```
### 6. Start frontend server 
```bash
npm run dev
```
### 7. Simulate to iot Device on different(new) terminal
```
cd backend
node publisher.js

```
## 🔑 Authentication
- **Default user is created for demo.**
- **Login at /login with:**
```
username: admin
password: 1234
```

## 🚀 Live
- **Link**: https://mini-io-t-device-management-system.vercel.app/

✅This project runs end-to-end locally:
- Start backend → npm run dev (in backend/)
- Start frontend → npm run dev (in frontend/)
- Run publisher → node publisher.js (in backend/)
- Open frontend → http://localhost:5173 and login.
- Watch live telemetry update in dashboard 🚀

