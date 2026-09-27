require("dotenv").config();
const express = require("express");
const cors = require("cors");
const staffRoutes = require("../routes/staffRoutes");

const announcementRoutes = require("../routes/announcementRoutes");
const opportunityRoutes = require("../routes/opportunityRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/staff", staffRoutes);

app.use("/api/announcements", announcementRoutes);
app.use("/api/opportunities", opportunityRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`FORA SA backend listening on http://localhost:${port}`);
});