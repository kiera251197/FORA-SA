const express = require("express");
const router = express.Router();
const controller = require("../controller/shiftController");

router.get("/", controller.list);

module.exports = router;