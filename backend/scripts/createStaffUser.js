require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

async function createStaffUser(username, password, displayName) {
    if (!username || !password || !displayName) {
        console.error('Example: node scripts/createStaffUser.js kiera "123456" "Kiera"');
        process.exit(1);
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO staff (username, password_hash, display_name) VALUES (?, ?, ?)",
            [username, hash, displayName]
        );
        console.log(`Staff user "${username}" created successfully.`);
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            console.error(`A staff user with the username "${username}" already exists`);
        } else {
            console.error(err.message);
        }
    } finally {
        process.exit(0);
    }
}

const [, , username, password, displayName] = process.argv;
createStaffUser(username, password, displayName);