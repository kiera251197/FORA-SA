const pool = require("../config/database");

async function getAll() {
    const [rows] = await pool.query(
        "SELECT id, title, description, hours_text AS hours, location, image_url AS image, tags FROM opportunities ORDER BY id"
    );
    return rows.map((row) => ({
        ...row,
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
    }));
}

async function getById(id) {
    const [rows] = await pool.query(
        "SELECT id, title, description, hours_text AS hours, location, image_url AS image, tags FROM opportunities WHERE id = ?",
        [id]
    );
    if (!rows[0]) return null;
    return { ...rows[0], tags: rows[0].tags ? rows[0].tags.split(",") : [] };
}

async function getImagePublicId(id) {
    const [rows] = await pool.query("SELECT image_public_id FROM opportunities WHERE id = ?", [id]);
    return rows[0]?.image_public_id || null;
}

async function create({ title, description, hours, location, tags, image, imagePublicId }) {
    const [result] = await pool.query(
        `INSERT INTO opportunities (title, description, hours_text, location, tags, image_url, image_public_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, hours, location, tags, image, imagePublicId]
    );
    return result.insertId;
}

async function updateWithImage(id, { title, description, hours, location, tags, image, imagePublicId }) {
    await pool.query(
        `UPDATE opportunities
         SET title = ?, description = ?, hours_text = ?, location = ?, tags = ?, image_url = ?, image_public_id = ?
         WHERE id = ?`,
        [title, description, hours, location, tags, image, imagePublicId, id]
    );
}

async function updateWithoutImage(id, { title, description, hours, location, tags }) {
    await pool.query(
        `UPDATE opportunities SET title = ?, description = ?, hours_text = ?, location = ?, tags = ? WHERE id = ?`,
        [title, description, hours, location, tags, id]
    );
}

async function remove(id) {
    await pool.query("DELETE FROM opportunities WHERE id = ?", [id]);
}

module.exports = { getAll, getById, getImagePublicId, create, updateWithImage, updateWithoutImage, remove };