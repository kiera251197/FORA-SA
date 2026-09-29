const Volunteer = require("../models/volunteerModel");

async function create(req, res) {
    try {
        const id = await Volunteer.create(req.body);
        res.status(201).json({ id });
    } catch (err) {
        console.error("Failed to create volunteer application:", err);
        res.status(500).json({ error: "Could not submit application" });
    }
}

async function list(req, res) {
    try {
        res.json(await Volunteer.getAll());
    } catch (err) {
        console.error("Failed to fetch volunteer applications:", err);
        res.status(500).json({ error: "Could not load applications" });
    }
}

module.exports = { create, list };