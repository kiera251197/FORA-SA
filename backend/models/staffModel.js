const pool = require("../config/database");

async function findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM staff WHERE username = ?", [username]);
    return rows[0] || null;
}

module.exports = { findByUsername };