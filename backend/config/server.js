require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const staffRoutes = require("../routes/staffRoutes");
const announcementRoutes = require("../routes/announcementRoutes");
const opportunityRoutes = require("../routes/opportunityRoutes");
const shiftRoutes = require("../routes/shiftRoutes");
const volunteerRoutes = require("../routes/volunteerRoutes");

const app = express();

const defaultOrigins = [
    "http://localhost:3000",
    "https://yellow-meadow-01f7f6c10.6.azurestaticapps.net"
];

const envOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
    : [];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

//testing...
app.get("/", (req, res) => {
  res.send("FORA API Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy error: Origin not allowed by CORS"));
    },
    credentials: true
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "FORA Backend is active" });
});

app.use("/api/staff", staffRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/volunteers", volunteerRoutes);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({ error: "That image is too large, please use one under 10MB." });
        }
        return res.status(400).json({ error: err.message });
    }
    console.error("Unhandled error:", err);
    res.status(500).json({ error: err.message || "Something went wrong on the server." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`FORA SA backend running on port ${port}`);
});