const jwt = require("jsonwebtoken");

function requireStaffAuth(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ error: "Not authenticated" });

    try {
        req.staff = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Session expired, please sign in again" });
    }
}

module.exports = requireStaffAuth;