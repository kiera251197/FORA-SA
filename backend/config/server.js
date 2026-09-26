const cloudinary = require("./cloudinary");
const upload = require("./upload");

app.get("/api/announcements", async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    try {
        const [rows] = await pool.query(
            "SELECT id, title, description, labels FROM announcements ORDER BY created_at DESC LIMIT ?",
            [limit]
        );
        const announcements = rows.map((row) => ({
            ...row,
            labels: row.labels ? row.labels.split(",").map((l) => l.trim()) : [],
        }));
        res.json(announcements);
    } catch (err) {
        console.error("Failed to fetch announcements:", err);
        res.status(500).json({ error: "Could not load announcements" });
    }
});

app.get("/api/announcements/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, description, labels FROM announcements WHERE id = ?",
            [req.params.id]
        );
        if (!rows[0]) return res.status(404).json({ error: "Not found" });
        res.json({ ...rows[0], labels: rows[0].labels ? rows[0].labels.split(",") : [] });
    } catch (err) {
        console.error("Failed to fetch announcement:", err);
        res.status(500).json({ error: "Could not load announcement" });
    }
});

app.post("/api/announcements", async (req, res) => {
    const { title, description, labels } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO announcements (title, description, labels, created_at) VALUES (?, ?, ?, NOW())",
            [title, description, labels]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error("Failed to create announcement:", err);
        res.status(500).json({ error: "Could not create announcement" });
    }
});

app.put("/api/announcements/:id", async (req, res) => {
    const { title, description, labels } = req.body;
    try {
        await pool.query(
            "UPDATE announcements SET title = ?, description = ?, labels = ? WHERE id = ?",
            [title, description, labels, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to update announcement:", err);
        res.status(500).json({ error: "Could not update announcement" });
    }
});

app.delete("/api/announcements/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM announcements WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to delete announcement:", err);
        res.status(500).json({ error: "Could not delete announcement" });
    }
});

// Create a new opportunity, with optional image
app.post("/api/opportunities", upload.single("image"), async (req, res) => {
    const { title, description, hours, location, tags } = req.body;
    const image = req.file ? req.file.path : null;
    const imagePublicId = req.file ? req.file.filename : null;

    try {
        const [result] = await pool.query(
            `INSERT INTO opportunities (title, description, hours_text, location, tags, image_url, image_public_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, hours, location, tags, image, imagePublicId]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error("Failed to create opportunity:", err);
        res.status(500).json({ error: "Could not create opportunity" });
    }
});

// Update an opportunity, replacing the image if a new one is sent
app.put("/api/opportunities/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const { title, description, hours, location, tags } = req.body;

    try {
        if (req.file) {
            // Look up the old image so we can delete it from Cloudinary
            const [rows] = await pool.query(
                "SELECT image_public_id FROM opportunities WHERE id = ?",
                [id]
            );
            if (rows[0]?.image_public_id) {
                await cloudinary.uploader.destroy(rows[0].image_public_id);
            }

            await pool.query(
                `UPDATE opportunities
                 SET title = ?, description = ?, hours_text = ?, location = ?, tags = ?, image_url = ?, image_public_id = ?
                 WHERE id = ?`,
                [title, description, hours, location, tags, req.file.path, req.file.filename, id]
            );
        } else {
            await pool.query(
                `UPDATE opportunities
                 SET title = ?, description = ?, hours_text = ?, location = ?, tags = ?
                 WHERE id = ?`,
                [title, description, hours, location, tags, id]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to update opportunity:", err);
        res.status(500).json({ error: "Could not update opportunity" });
    }
});

// Delete an opportunity and its Cloudinary image
app.delete("/api/opportunities/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            "SELECT image_public_id FROM opportunities WHERE id = ?",
            [id]
        );
        if (rows[0]?.image_public_id) {
            await cloudinary.uploader.destroy(rows[0].image_public_id);
        }
        await pool.query("DELETE FROM opportunities WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to delete opportunity:", err);
        res.status(500).json({ error: "Could not delete opportunity" });
    }
});

const cloudinary = require("./cloudinary");
const upload = require("./upload");

// Create a new opportunity, with optional image
app.post("/api/opportunities", upload.single("image"), async (req, res) => {
    const { title, description, hours, location, tags } = req.body;
    const image = req.file ? req.file.path : null;
    const imagePublicId = req.file ? req.file.filename : null;

    try {
        const [result] = await pool.query(
            `INSERT INTO opportunities (title, description, hours_text, location, tags, image_url, image_public_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, hours, location, tags, image, imagePublicId]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error("Failed to create opportunity:", err);
        res.status(500).json({ error: "Could not create opportunity" });
    }
});

// Update an opportunity, replacing the image if a new one is sent
app.put("/api/opportunities/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const { title, description, hours, location, tags } = req.body;

    try {
        if (req.file) {
            // Look up the old image so we can delete it from Cloudinary
            const [rows] = await pool.query(
                "SELECT image_public_id FROM opportunities WHERE id = ?",
                [id]
            );
            if (rows[0]?.image_public_id) {
                await cloudinary.uploader.destroy(rows[0].image_public_id);
            }

            await pool.query(
                `UPDATE opportunities
                 SET title = ?, description = ?, hours_text = ?, location = ?, tags = ?, image_url = ?, image_public_id = ?
                 WHERE id = ?`,
                [title, description, hours, location, tags, req.file.path, req.file.filename, id]
            );
        } else {
            await pool.query(
                `UPDATE opportunities
                 SET title = ?, description = ?, hours_text = ?, location = ?, tags = ?
                 WHERE id = ?`,
                [title, description, hours, location, tags, id]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to update opportunity:", err);
        res.status(500).json({ error: "Could not update opportunity" });
    }
});

// Delete an opportunity and its Cloudinary image
app.delete("/api/opportunities/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            "SELECT image_public_id FROM opportunities WHERE id = ?",
            [id]
        );
        if (rows[0]?.image_public_id) {
            await cloudinary.uploader.destroy(rows[0].image_public_id);
        }
        await pool.query("DELETE FROM opportunities WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to delete opportunity:", err);
        res.status(500).json({ error: "Could not delete opportunity" });
    }
});

app.get("/api/opportunities/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, description, hours_text AS hours, location, image_url AS image, tags FROM opportunities WHERE id = ?",
            [req.params.id]
        );
        if (!rows[0]) return res.status(404).json({ error: "Not found" });
        res.json({ ...rows[0], tags: rows[0].tags ? rows[0].tags.split(",") : [] });
    } catch (err) {
        console.error("Failed to fetch opportunity:", err);
        res.status(500).json({ error: "Could not load opportunity" });
    }
});