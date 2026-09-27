const pool = require("../config/database");

async function getAll() {
    const [rows] = await pool.query(
        `SELECT 
            o.id, 
            o.title, 
            o.description, 
            o.hours_text AS hours, 
            o.location, 
            o.image_url AS image, 
            GROUP_CONCAT(l.name SEPARATOR ',') AS tags
        FROM opportunities o
        LEFT JOIN opportunity_tags ot ON o.id = ot.opportunity_id
        LEFT JOIN labels l ON ot.label_id = l.id
        GROUP BY o.id
        ORDER BY o.id`
    );

    return rows.map((row) => ({
        ...row,
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
    }));
}

async function getById(id) {
    const [rows] = await pool.query(
        `SELECT 
            o.id, 
            o.title, 
            o.description, 
            o.hours_text AS hours, 
            o.location, 
            o.image_url AS image, 
            GROUP_CONCAT(l.name SEPARATOR ',') AS tags
        FROM opportunities o
        LEFT JOIN opportunity_tags ot ON o.id = ot.opportunity_id
        LEFT JOIN labels l ON ot.label_id = l.id
        WHERE o.id = ?
        GROUP BY o.id`,
        [id]
    );

    if (!rows[0]) return null;
    return {
        ...rows[0],
        tags: rows[0].tags ? rows[0].tags.split(",").map((t) => t.trim()) : [],
    };
}

async function getImagePublicId(id) {
    const [rows] = await pool.query("SELECT image_public_id FROM opportunities WHERE id = ?", [id]);
    return rows[0]?.image_public_id || null;
}

async function create({ title, description, hours, location, tags, image, imagePublicId }) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const hoursFormatted = hours ? (hours.includes("hrs") ? hours : `${hours}hrs/session`) : "2hrs/session";

        const [result] = await connection.query(
            `INSERT INTO opportunities (title, description, hours_text, location, image_url, image_public_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, hoursFormatted, location, image, imagePublicId]
        );
        const oppId = result.insertId;

        const tagList = Array.isArray(tags) ? tags : tags ? tags.split(",").map((t) => t.trim()) : [];
        for (const tagName of tagList) {
            await connection.query(
                `INSERT INTO opportunity_tags (opportunity_id, label_id)
                 SELECT ?, id FROM labels WHERE name = ?`,
                [oppId, tagName]
            );
        }

        await connection.commit();
        return oppId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

async function updateWithImage(id, { title, description, hours, location, tags, image, imagePublicId }) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const hoursFormatted = hours ? (hours.includes("hrs") ? hours : `${hours}hrs/session`) : "2hrs/session";

        await connection.query(
            `UPDATE opportunities
             SET title = ?, description = ?, hours_text = ?, location = ?, image_url = ?, image_public_id = ?
             WHERE id = ?`,
            [title, description, hoursFormatted, location, image, imagePublicId, id]
        );

        await connection.query("DELETE FROM opportunity_tags WHERE opportunity_id = ?", [id]);

        const tagList = Array.isArray(tags) ? tags : tags ? tags.split(",").map((t) => t.trim()) : [];
        for (const tagName of tagList) {
            await connection.query(
                `INSERT INTO opportunity_tags (opportunity_id, label_id)
                 SELECT ?, id FROM labels WHERE name = ?`,
                [id, tagName]
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

async function updateWithoutImage(id, { title, description, hours, location, tags }) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const hoursFormatted = hours ? (hours.includes("hrs") ? hours : `${hours}hrs/session`) : "2hrs/session";

        await connection.query(
            `UPDATE opportunities
             SET title = ?, description = ?, hours_text = ?, location = ?
             WHERE id = ?`,
            [title, description, hoursFormatted, location, id]
        );

        await connection.query("DELETE FROM opportunity_tags WHERE opportunity_id = ?", [id]);

        const tagList = Array.isArray(tags) ? tags : tags ? tags.split(",").map((t) => t.trim()) : [];
        for (const tagName of tagList) {
            await connection.query(
                `INSERT INTO opportunity_tags (opportunity_id, label_id)
                 SELECT ?, id FROM labels WHERE name = ?`,
                [id, tagName]
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
    await pool.query("DELETE FROM opportunities WHERE id = ?", [id]);
}

module.exports = { getAll, getById, getImagePublicId, create, updateWithImage, updateWithoutImage, remove };