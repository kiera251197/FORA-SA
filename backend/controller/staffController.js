const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const staff = await Staff.findByUsername(username);
        if (!staff || !(await bcrypt.compare(password, staff.password_hash))) {
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        const token = jwt.sign(
            { id: staff.id, username: staff.username },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );
        res.json({ token, staffName: staff.display_name });
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ error: "Login failed" });
    }
}

module.exports = { login };