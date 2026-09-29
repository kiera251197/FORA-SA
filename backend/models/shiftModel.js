const pool = require("../config/database");

async function getAll() {
    const [rows] = await pool.query("SELECT id, label FROM shifts ORDER BY id");
    return rows;
}

module.exports = { getAll };