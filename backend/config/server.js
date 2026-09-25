require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Matches the fetch("/api/announcements?limit=3") already in home.js
app.get("/api/announcements", async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  try {
    const [rows] = await pool.query(
      "SELECT id, message, urgent FROM announcements ORDER BY created_at DESC LIMIT ?",
      [limit]
    );
    // urgent comes back from MySQL as 0/1; convert to a real boolean for the frontend
    const announcements = rows.map((row) => ({ ...row, urgent: Boolean(row.urgent) }));
    res.json(announcements);
  } catch (err) {
    console.error("Failed to fetch announcements:", err);
    res.status(500).json({ error: "Could not load announcements" });
  }
});

// Matches the "Featured Volunteer Opportunities" cards
app.get("/api/opportunities", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, title, description FROM opportunities ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch opportunities:", err);
    res.status(500).json({ error: "Could not load opportunities" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`FORA SA backend listening on http://localhost:${port}`);
});