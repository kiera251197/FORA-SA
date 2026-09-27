const Announcement = require("../models/announcementModel");

async function list(req, res) {
    const limit = Number(req.query.limit) || 10;
    try {
        res.json(await Announcement.getAll(limit));
    } catch (err) {
        console.error("Failed to fetch announcements:", err);
        res.status(500).json({ error: "Could not load announcements" });
    }
}

async function getOne(req, res) {
    try {
        const announcement = await Announcement.getById(req.params.id);
        if (!announcement) return res.status(404).json({ error: "Not found" });
        res.json(announcement);
    } catch (err) {
        console.error("Failed to fetch announcement:", err);
        res.status(500).json({ error: "Could not load announcement" });
    }
}

async function create(req, res) {
    try {
        const id = await Announcement.create(req.body);
        res.status(201).json({ id });
    } catch (err) {
        console.error("Failed to create announcement:", err);
        res.status(500).json({ error: "Could not create announcement" });
    }
}

async function update(req, res) {
    try {
        await Announcement.update(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to update announcement:", err);
        res.status(500).json({ error: "Could not update announcement" });
    }
}

async function remove(req, res) {
    try {
        await Announcement.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to delete announcement:", err);
        res.status(500).json({ error: "Could not delete announcement" });
    }
}

module.exports = { list, getOne, create, update, remove };