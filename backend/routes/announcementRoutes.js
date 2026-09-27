const express = require("express");
const router = express.Router();
const controller = require("../controller/announcementController");
const requireStaffAuth = require("../middleware/requireStaffAuth");

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", requireStaffAuth, controller.create);
router.put("/:id", requireStaffAuth, controller.update);
router.delete("/:id", requireStaffAuth, controller.remove);

module.exports = router;