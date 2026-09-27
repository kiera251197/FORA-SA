const pool = require("../config/database");

async function getAll(limit) {
    const [rows] = await pool.query(
        `SELECT 
            a.id, 
            a.title, 
            a.description, 
            a.created_at,
            GROUP_CONCAT(l.name SEPARATOR ',') AS labels
        FROM announcements a
        LEFT JOIN announcement_labels al ON a.id = al.announcement_id
        LEFT JOIN labels l ON al.label_id = l.id
        GROUP BY a.id
        ORDER BY a.created_at DESC 
        LIMIT ?`,
        [limit]
    );

    return rows.map((row) => ({
        ...row,
        labels: row.labels ? row.labels.split(",").map((l) => l.trim()) : [],
    }));
}

async function getById(id) {
    const [rows] = await pool.query(
        `SELECT 
            a.id, 
            a.title, 
            a.description, 
            a.created_at,
            GROUP_CONCAT(l.name SEPARATOR ',') AS labels
        FROM announcements a
        LEFT JOIN announcement_labels al ON a.id = al.announcement_id
        LEFT JOIN labels l ON al.label_id = l.id
        WHERE a.id = ?
        GROUP BY a.id`,
        [id]
    );

    if (!rows[0]) return null;
    return {
        ...rows[0],
        labels: rows[0].labels ? rows[0].labels.split(",").map((l) => l.trim()) : [],
    };
}

async function create({ title, description, labels }) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert announcement
        const [result] = await connection.query(
            "INSERT INTO announcements (title, description, created_at) VALUES (?, ?, NOW())",
            [title, description]
        );
        const announcementId = result.insertId;

        // Insert labels into junction table
        const labelList = Array.isArray(labels)
            ? labels
            : labels ? labels.split(",").map((l) => l.trim()).filter(Boolean) : [];

        for (const labelName of labelList) {
            await connection.query(
                `INSERT INTO announcement_labels (announcement_id, label_id)
                 SELECT ?, id FROM labels WHERE name = ?`,
                [announcementId, labelName]
            );
        }

        await connection.commit();
        return announcementId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

async function update(id, { title, description, labels }) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Update main record
        await connection.query(
            "UPDATE announcements SET title = ?, description = ? WHERE id = ?",
            [title, description, id]
        );

        // Delete old junction links
        await connection.query(
            "DELETE FROM announcement_labels WHERE announcement_id = ?",
            [id]
        );

        // Re-insert updated labels
        const labelList = Array.isArray(labels)
            ? labels
            : labels ? labels.split(",").map((l) => l.trim()).filter(Boolean) : [];

        for (const labelName of labelList) {
            await connection.query(
                `INSERT INTO announcement_labels (announcement_id, label_id)
                 SELECT ?, id FROM labels WHERE name = ?`,
                [id, labelName]
            );
        }

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

async function remove(id) {
    await pool.query("DELETE FROM announcements WHERE id = ?", [id]);
}

module.exports = { getAll, getById, create, update, remove };