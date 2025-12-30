// backend/Routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../module/user"); // adjust path if needed

const router = express.Router();

// Helper to create JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );


// TEMP route: seed demo users (call once)
router.get("/seed-demo", async (req, res) => {

  try {
    await User.deleteMany({});

    const users = [
      {
        name: "Student Demo",
        email: "student@demo.com",
        password: "password",
        role: "student",
      },
      {
        name: "Faculty Demo",
        email: "faculty@demo.com",
        password: "password",
        role: "faculty",
      },
      {
        name: "Admin Demo",
        email: "admin@demo.com",
        password: "password",
        role: "admin",
      },
    ];

    for (const u of users) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(u.password, salt);
      await User.create({ ...u, password: hashed });
    }

    res.json({ message: "Demo users created" });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ message: "Seed failed" });
  }
});
// NEW: register route
// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email, role });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
