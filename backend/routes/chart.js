const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const authenticateToken = require("../middlewares/auth");

router.get("/charts", authenticateToken, (req, res) => {
  console.log("✅ charts API called");
  const dataPath = path.join(__dirname, "..", "data", "example_data.json");

  fs.readFile(dataPath, "utf8", (err, jsonData) => {
    if (err) return res.status(500).json({ error: "Cannot read data file" });

    try {
      const parsedData = JSON.parse(jsonData);
      res.json(parsedData);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

module.exports = router;
