const pool = require("../config/database");

async function create({
    firstName, lastName, email, phone,
    emergencyContactName, emergencyContactPhone,
    opportunityId, shiftId, skills, motivation,
}) {
    const [result] = await pool.query(
        `INSERT INTO volunteers
            (first_name, last_name, email, phone, emergency_contact_name, emergency_contact_phone, opportunity_id, shift_id, skills, motivation, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [firstName, lastName, email, phone, emergencyContactName, emergencyContactPhone,
         opportunityId || null, shiftId || null, skills, motivation]
    );
    return result.insertId;
}

async function getAll() {
    const [rows] = await pool.query(
        `SELECT
            v.id, v.first_name, v.last_name, v.email, v.phone,
            v.emergency_contact_name, v.emergency_contact_phone,
            v.skills, v.motivation, v.created_at,
            o.title AS opportunity_title,
            s.label AS shift_label,
            GROUP_CONCAT(DISTINCT l.name SEPARATOR ',') AS opportunity_tags
        FROM volunteers v
        LEFT JOIN opportunities o ON v.opportunity_id = o.id
        LEFT JOIN shifts s ON v.shift_id = s.id
        LEFT JOIN opportunity_tags ot ON o.id = ot.opportunity_id
        LEFT JOIN labels l ON ot.label_id = l.id
        GROUP BY v.id
        ORDER BY v.created_at DESC`
    );

    return rows.map((row) => ({
        ...row,
        opportunity_tags: row.opportunity_tags ? row.opportunity_tags.split(",").map((t) => t.trim()) : [],
    }));
}

async function getById(id) {
    const [rows] = await pool.query(
        `SELECT
            v.id, v.first_name, v.last_name, v.email, v.phone,
            v.emergency_contact_name, v.emergency_contact_phone,
            v.skills, v.motivation, v.created_at,
            o.title AS opportunity_title,
            s.label AS shift_label
        FROM volunteers v
        LEFT JOIN opportunities o ON v.opportunity_id = o.id
        LEFT JOIN shifts s ON v.shift_id = s.id
        WHERE v.id = ?`,
        [id]
    );
    return rows[0] || null;
}

module.exports = { create, getAll, getById };