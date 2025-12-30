require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // your path was './config/db'

connectDB();

const app = express();

// --------- MIDDLEWARE ----------
app.use(express.json());

// CORS: allow frontend on 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// --------- ROUTES ----------
app.get("/", (req, res) => res.send("API is running"));

app.use("/api/auth", require("./Routes/authRoutes"));

app.use("/api/dashboard", require("./Routes/dashboardRoutes"));
app.use("/api/events", require("./Routes/eventRoutes"));

// --------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



