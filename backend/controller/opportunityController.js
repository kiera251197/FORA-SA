const cloudinary = require("../config/cloudinary");
const Opportunity = require("../models/opportunityModel");

async function list(req, res) {
    try {
        res.json(await Opportunity.getAll());
    } catch (err) {
        console.error("Failed to fetch opportunities:", err);
        res.status(500).json({ error: "Could not load opportunities" });
    }
}

async function getOne(req, res) {
    try {
        const opp = await Opportunity.getById(req.params.id);
        if (!opp) return res.status(404).json({ error: "Not found" });
        res.json(opp);
    } catch (err) {
        console.error("Failed to fetch opportunity:", err);
        res.status(500).json({ error: "Could not load opportunity" });
    }
}

async function create(req, res) {
    const { title, description, hours, location, tags } = req.body;
    const image = req.file ? req.file.path : null;
    const imagePublicId = req.file ? req.file.filename : null;
    try {
        const id = await Opportunity.create({ title, description, hours, location, tags, image, imagePublicId });
        res.status(201).json({ id });
    } catch (err) {
        console.error("Failed to create opportunity:", err);
        res.status(500).json({ error: "Could not create opportunity" });
    }
}

async function update(req, res) {
    const { id } = req.params;
    const { title, description, hours, location, tags } = req.body;
    try {
        if (req.file) {
            const oldPublicId = await Opportunity.getImagePublicId(id);
            if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
            await Opportunity.updateWithImage(id, {
                title, description, hours, location, tags,
                image: req.file.path, imagePublicId: req.file.filename,
            });
        } else {
            await Opportunity.updateWithoutImage(id, { title, description, hours, location, tags });
        }
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to update opportunity:", err);
        res.status(500).json({ error: "Could not update opportunity" });
    }
}

async function remove(req, res) {
    const { id } = req.params;
    try {
        const publicId = await Opportunity.getImagePublicId(id);
        if (publicId) await cloudinary.uploader.destroy(publicId);
        await Opportunity.remove(id);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to delete opportunity:", err);
        res.status(500).json({ error: "Could not delete opportunity" });
    }
}

module.exports = { list, getOne, create, update, remove };