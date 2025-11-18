const express = require("express");
const router = express.Router();
const Cafe = require("../models/Cafe");

// GET all cafes
router.get("/", async (req, res) => {
  try {
    const cafes = await Cafe.find().sort({ createdAt: -1 });
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new cafe
router.post("/", async (req, res) => {
  const cafe = new Cafe({
    cafeName: req.body.cafeName,
    contact: req.body.contact,
  });

  try {
    const newCafe = await cafe.save();
    res.status(201).json(newCafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
