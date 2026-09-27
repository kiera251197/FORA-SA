const pool = require("../config/database");

async function getAll(limit) {
    const [rows] = await pool.query(
        "SELECT id, title, description, labels FROM announcements ORDER BY created_at DESC LIMIT ?",
        [limit]
    );
    return rows.map((row) => ({
        ...row,
        labels: row.labels ? row.labels.split(",").map((l) => l.trim()) : [],
    }));
}

async function getById(id) {
    const [rows] = await pool.query(
        "SELECT id, title, description, labels FROM announcements WHERE id = ?",
        [id]
    );
    if (!rows[0]) return null;
    return { ...rows[0], labels: rows[0].labels ? rows[0].labels.split(",") : [] };
}

async function create({ title, description, labels }) {
    const [result] = await pool.query(
        "INSERT INTO announcements (title, description, labels, created_at) VALUES (?, ?, ?, NOW())",
        [title, description, labels]
    );
    return result.insertId;
}

async function update(id, { title, description, labels }) {
    await pool.query(
        "UPDATE announcements SET title = ?, description = ?, labels = ? WHERE id = ?",
        [title, description, labels, id]
    );
}

async function remove(id) {
    await pool.query("DELETE FROM announcements WHERE id = ?", [id]);
}

module.exports = { getAll, getById, create, update, remove };