const express = require("express");
const router = express.Router();
const controller = require("../controller/volunteerController");
const requireStaffAuth = require("../middleware/requireStaffAuth");

router.post("/", controller.create); 
router.get("/", requireStaffAuth, controller.list); 

module.exports = router;