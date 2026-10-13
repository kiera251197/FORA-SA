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

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));app.use(express.json());

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
    res.status(500).json({ error: "Something went wrong on the server." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`FORA SA backend running on http://localhost:${port}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}
