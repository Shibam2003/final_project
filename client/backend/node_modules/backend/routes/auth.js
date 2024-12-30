const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password, purpose } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ username, email, password, purpose });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error registering user.", error: err });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful.", user });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err });
  }
});

module.exports = router;
