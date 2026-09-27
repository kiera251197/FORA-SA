const express = require("express");
const router = express.Router();
const controller = require("../controller/staffController");

router.post("/login", controller.login);

module.exports = router;