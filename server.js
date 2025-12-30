require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // fix any old "New folder" path

connectDB();
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://<your-frontend>.vercel.app"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Root route so GET / works
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// --------- ROUTES ----------
app.get("/", (req, res) => res.send("API is running"));

app.use("/api/auth", require("./New folder/Routes/authRoutes"));

app.use("/api/dashboard", require("./New folder/Routes/dashboardRoutes"));
app.use("/api/events", require("./New folder/Routes/eventRoutes"));

// --------- SERVER ----------
module.exports = app;




