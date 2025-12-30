require("dotenv").config();
import express from "express";
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// --------- MIDDLEWARE ----------
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://optima-frozen-in-code-53h2.vercel.app/" // your deployed frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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




