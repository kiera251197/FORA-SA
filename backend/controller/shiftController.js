const Shift = require("../models/shiftModel");

async function list(req, res) {
    try {
        res.json(await Shift.getAll());
    } catch (err) {
        console.error("Failed to fetch shifts:", err);
        res.status(500).json({ error: "Could not load shifts" });
    }
}

module.exports = { list };